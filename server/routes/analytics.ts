
import {Router} from "express";
import type {Response} from "express";
import {Feedback} from "../models/Feedback";
import {requiredDashboardAuth} from "../middleware/dashboardMiddleware";
import type {AuthenticatedUserRequest} from "../middleware/dashboardMiddleware";

const router = Router();

//dashboard feedback endpt: retrieves all reviews for the logged-in business account

router.get("/feed", requiredDashboardAuth, 
    async (req: AuthenticatedUserRequest, res: Response): Promise<any> => {
        try {
            //req.user was safely injected by our dashboard middleware on validation
            const businessId = req.user?.userId;
            //query MongoDB for all feedback instances belonging to this businessId
            //sorted by newest entries first
            const reviews = await Feedback.find({ businessId }).sort({ createdAt: -1});
            //calculate quick high-level dashbaord metrics dynamically
            const totalSubmissions = reviews.length;

            const ratedReviews = reviews.filter(r => r.rating);
            const averageRating = ratedReviews.length 
                ? Number((ratedReviews.reduce(sum, r) => sum + (r.rating || 0), 0) / ratedReviews.length).toFixed(1)
                : 0;
            res.status(200).json({
                metrics: {
                    totalSubmissions,averageRating
                },
                reviews
            });
        } catch (error) {
            console.error("Failed to load dashboard metrics:", error);
            res.status(500).json({ message: "Server failed to load analytics records"});
        }
    });

export default router;