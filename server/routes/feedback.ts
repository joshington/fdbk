
//handles incoming feedback payloads from the widget
import   {Router} from "express";
import type {Response} from "express";
import {Feedback} from "../models/Feedback";
import {validateWidgetApiKey} from "../middleware/authMiddleware";
import type {AuthenticatedWidgetRequest} from "../middleware/authMiddleware";



const router = Router();
//ingestion endpt: receives feeddback submissions directly from the frontend widget
//Post /api/feedback/submit
//secured by:validateWidgetApiKey middleware

router.post("/submit",  validateWidgetApiKey, 
    async (req: AuthenticatedWidgetRequest, res: Response): Promise<any> => {
        try {
            const {text, rating, source} = req.body;
            //enforce that feedback must contain text
            if(!text || !text.trim()) {
                return res.status(400).json({
                    status: "error",
                    message: "Feedback text is requred."
                });
            }
            //== map the validated business data injected by our middleware, and build
            //the record.
            const newFeedback = new Feedback({
                businessId: req.business._id, 
                //tied securely to the authenticated business owner
                text: text.trim(),
                rating: rating, //maps the 1- 5 constraint cleanly
                source:source || "website"
            });
            //3.commit the record directly to mongoDB cluster
            await newFeedback.save();
            //4. return the explicit success payload matching your frontend union types
            res.status(201).json({
                status: "success",
                feedbackId: newFeedback._id.toString()
            });
        } catch (error) {
            console.error("Failed to commit feedback entry:", error);
            res.status(500).json({ 
                status: "error",
                message: "Failed to store feedback in database"
            });
        }
    });

    export default router;