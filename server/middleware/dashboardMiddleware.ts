
//dashboard auth middleware
//middleware intercepts requests from your private dashboard UI, read the 
// Authorization: Bearer <token> header and decode it.

import jwt from "jsonwebtoken";
import type {Request, Response, NextFunction} from "express";

export interface AuthenticatedUserRequest extends Request {
    user?: {
        userId: string;
        businessName: string;
    };
}

export function requiredDashboardAuth(
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
): any {
    try {
        //1 - grab the standard authorization header {Format: "Bearer TOKEN_STRING"}
        const authHeader = req.header("Authorization");
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message: "Access denied. Missing session token"});
        }
        const token = authHeader.split(" ")[1];
        //verify and decode the JWT token using your secret key
        const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
        const decoded  = jwt.verify(token, jwtSecret) as {userId: string; businessName: string};

        //3 - attach the decoded user data payload to the request lifecycle
        req.user = decoded;
        //4 - proceed to the data-fetching router
        next();
    } catch (error) {
        console.error("Dashboard auth verification failed:", error);
        res.status(401).json({message: "Invalid or expired session token. Please log in again"});
    }
}