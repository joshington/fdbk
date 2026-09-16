

//guarantees that only widgets with a valid business API key can write to the DB

import type {Request, Response, NextFunction} from "express";
import {User} from "../models/User";

//extends the express Request type interface so we can pass the business object
//to the route

export interface AuthenticatedWidgetRequest extends Request {
    business?: any;
}

export async function validateWidgetApiKey(
    req: AuthenticatedWidgetRequest,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        //grab the custom token header from the request
        const apiKey = req.header("X-Widget-API-Key");

        if(!apiKey) {
            return res.status(401).json({
                status: "error", message:"Unauthorized: Missing API Key header"
            });
        }
        //look up the business owner associated with this key in MongoDB
        const business = await User.findOne({apiKey});

        if(!business) {
            return res.status(401).json({ 
                status: "error",
                message: "Unauthorized: Invalid API Key"
            });
        }
        //attach the business details to the request object
        req.business = business;
        //everything is valid, proceed to the ingestion endpt
        next();
    } catch(error) {
        console.error("API Key Validation crash:", error);
        res.status(500).json({ 
            status: "error", message:"Internal security validation failure"
        });
    }
}