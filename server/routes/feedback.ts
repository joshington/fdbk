
//handles incoming feedback payloads from the widget
import   {Router} from "express";
import type {Response} from "express";
import {Feedback} from "../models/Feedback";
import {validateWidgetApiKey} from "../middleware/authMiddleware";
import type {AuthenticatedWidgetRequest} from "../middleware/authMiddleware";

import geoip from "geoip-lite";

const router = Router();
//ingestion endpt: receives feeddback submissions directly from the frontend widget
//Post /api/feedback/submit
//secured by:validateWidgetApiKey middleware



//add a smart helper function that intercepts the incoming text,  triages it and 
//commits the tag to MongoDB atlas

function triageFeedbackText(text: string): "bug" | "request" | "praise" | "general" {
    const lowerText = text.toLowerCase();

    //keyword matching matrix
    const bugKeywords = ["bug", "broken", "error", "fail", "crash", "slow", "freeze", "wrong","cannot", "cant"];
    const requestKeywords = ["feature", "want", "should", "add", "could you","hope","improve","idea"];
    const praiseKeywords = ["love", "awesome", "great", "perfect", "amazing", "good","thanks","best"];

    if (bugKeywords.some(word => lowerText.includes(word))) return "bug";
    if (requestKeywords.some(word => lowerText.includes(word))) return "request";
    if (praiseKeywords.some(word => lowerText.includes(word))) return "praise";

    return "general";
}




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
            //==capture client IP address (check for proxy forwarding headers too)
            const rawIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

            //safely parse out the primary IP String, ensuring it handles array,string
            //or undefined
            let ipString = "";
            if(Array.isArray(rawIp)) {
                ipString = rawIp[0] || "";
            } else if(typeof rawIp === "string") {
                ipString = rawIp.split(",")[0]?.trim() || "";
            }

            let locationResolved = "Kampala, Uganda";
            const geo = geoip.lookup(ipString);
            if(geo){
                const city = geo.city || "Unknown City";
                const country = geo.country || "Unknown Country";
                locationResolved = `${city}, ${country}`;
            }

            //const ipString = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(",")[0].trim();
            //== map the validated business data injected by our middleware, and build
            //the record.
            const newFeedback = new Feedback({
                businessId: req.business._id, 
                //tied securely to the authenticated business owner
                text: text.trim(),
                rating: rating, //maps the 1- 5 constraint cleanly
                source:source || "website",
                category: triageFeedbackText(text),
                location: locationResolved
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