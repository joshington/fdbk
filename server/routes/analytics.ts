
import {Router} from "express";
import type {Response} from "express";
import {Feedback} from "../models/Feedback";
import {User} from "../models/User";
import {requiredDashboardAuth} from "../middleware/dashboardMiddleware";
import type {AuthenticatedUserRequest} from "../middleware/dashboardMiddleware";

//import type {FilterQuery} from "mongoose";

const router = Router();

//dashboard feedback endpt: retrieves all reviews for the logged-in business account

router.get("/feed", requiredDashboardAuth, 
    async (req: AuthenticatedUserRequest, res: Response): Promise<any> => {
        try {
            //req.user was safely injected by our dashboard middleware on validation
            const businessId = req.user?.userId;

            //1 - pagination calculation params
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 5; 
            //serves 5 entries per page block
            const skip = (page - 1) * limit;

            //2 == query configs setup
            const queryConditions: Record<string, any> = {businessId};
            if (req.query.rating) queryConditions.rating = parseInt(req.query.rating as string, 10);
            if (req.query.source) queryConditions.source = req.query.source as string;


            //== query the exact paginated subset slice using skip and limit params
            const reviews:any = await Feedback.find(queryConditions)
                .sort({createdAt: -1})
                .skip(skip)
                .limit(limit);

            const totalMatchingReviews = await Feedback.countDocuments(queryConditions);

            
            
            //==fetch the business details using the ID from the token to grab the API key
            const businessUser =  await User.findById(businessId);


            //==initialize our MongoDB query conditions, prelocking it to this business
            //const queryConditions: any = {businessId};

            //dynamic rating filter(.. /feed?rating=5)
            if(req.query.rating) {
                const parsedRating = parseInt(req.query.rating as string, 10);
                if(!isNaN(parsedRating) && parsedRating >= 1 && parsedRating <= 5) {
                    queryConditions.rating = parsedRating;
                }
            }

            //3 - dynamic source filter(e.g /feed?source=website)
            if(req.query.source) {
                queryConditions.source = req.query.source as string;
            }

            //query MongoDB for all feedback instances belonging to this businessId
            //sorted by newest entries first

            //==go ahead and fetch the filtered reviews from MongoDB
            //const reviews = await Feedback.find({ businessId }).sort({ createdAt: -1});
            //const reviews = await Feedback.find(queryConditions).sort({ createdAt: -1 });
            //calculate quick high-level dashbaord metrics dynamically

            //==i have added this, we fetch all reviews once without conditions to keep
            //the global top metrics cards accurate, even if the feed below is filtered
            const allBusinessReviews = await Feedback.find({ businessId } as any);

            //const totalSubmissions = reviews.length;
            const totalSubmissions = allBusinessReviews.length;


            //calculate geographic traffic summary 
            const locationCounts: Record<string, number> = {};

            const distribution = { _5: 0, _4: 0, _3: 0, _2: 0, _1: 0 };


            const ratedReviews = allBusinessReviews.filter(r => {

                //trace and count locations dynamically using geoip-lite
                const loc = r.location || "unknown Location";
                locationCounts[loc] = (locationCounts[loc] || 0) + 1;

                if(r.rating === 5) distribution._5++;
                if(r.rating === 4) distribution._4++;
                if(r.rating === 3) distribution._3++;
                if(r.rating === 2) distribution._2++;
                if(r.rating === 1) distribution._1++;
                return r.rating;
            });

            //format, sort and slice down the top3 traffic locations \
            const topLocations = Object.entries(locationCounts)
                .map(([name,count]) => ({name, count}))
                .sort((a, b) => b.count - a.count)
                .slice(0, 3);


            const averageRating = ratedReviews.length 
                ? Number((ratedReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / ratedReviews.length).toFixed(1))
                : 0;

             
            //send back the payload
            res.status(200).json({   
                metrics: {
                    totalSubmissions,averageRating
                },
                distribution,
                topLocations,
                apiKey: businessUser ? businessUser.apiKey : "",
                //filteredCount: reviews.length, //let the frontend know how many items matched filters
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalMatchingReviews / limit),
                    totalItems: totalMatchingReviews,
                    hasNextPage: skip + reviews.length < totalMatchingReviews,
                },
                reviews
            });
        } catch (error) {
            console.error("Failed to load dashboard metrics:", error);
            res.status(500).json({ message: "Server pagination synchronization failure." });

        }
    });

export default router;