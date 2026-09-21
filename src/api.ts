
import type {FeedbackPayload, SubmitResponse} from "./types";

//target running local express server endpt
//const BASE_URL = "http://localhost:5000/api/feedback";
const BASE_URL = "https://fdbk.onrender.com/api/feedback";

//sends the feedback payload to the backend server
//Injects the custom X-Widget-API-Key into the headers for validation.

export async function submitFeedbackToAPI(
    payload: FeedbackPayload,
    apiKey: string 
): Promise<SubmitResponse> {
    try {
        const response = await fetch(`${BASE_URL}/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "appllication/json",
                "X-Widget-API-Key": apiKey //securely passing key in header
            },
            body: JSON.stringify(payload)
        });
        //check if the server returned a non-2xx status code
        if(!response.ok){
            const errorData = await response.json();
            return {
                status: "error",
                message: errorData.message || "Failed to submit feedback"
            };
        }
        //return the exact {status:"success", feedbackId} shape matching types.ts
        return await response.json();
    } catch (error) {
        console.error("Network communication failure:", error);
        return {
            status: "error",
            message: "Network error. Please check your internet connection"
        };
    }
}
