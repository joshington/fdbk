
//brain of the entire system, when business embeds the script tag on website
//file executes automatically 
//1 - responsible for finding its own script tag to read the business's  custom API key
//2 - initializing the UI by calling initUI from ui.ts
//3 - managing the state transitions (idle -> submitting -> success/error) using
//our UIState union types

import type {UIState, FeedbackPayload} from "./types";
import {initUI, render} from "./ui";
import {submitFeedbackToAPI} from "./api";

//track the active state of the widget internally
let currentState: UIState = {status: "idle"};
//updates local state and instantly pushes it to the UI layer
let currentApiKey: string | null = null; //track key globally inside the widget

function updateState(newState: UIState): void {
    currentState = newState;
    render(currentState);
}

//extracts API key from the embeded script tag
//looks for an  attribute likke: data-api-key="your-business-key-here"

function getApiKeyFromScript(): string | null {
    //look for any script tags containing our key attribute
    const scriptTag = document.querySelector("script[data-api-key]") as HTMLScriptElement;

    if(!scriptTag) {
        console.error("Feedback widget Error: Script tag missing data-api-key")
        return null;
    }
    return scriptTag.getAttribute("data-api-key");
}

//handles what happens when a user clicks submit in the UI
async function handleFeedbackSubmit(payload: FeedbackPayload): Promise<void> {
    if(!currentApiKey){
        updateState({ status: "error", message: "Missing initialization API Key"});
        return;
    }
    //1 - instantly transition UI to a loading/submitting look
    updateState({status: "submitting"});

    //mocking a network request with a 1.5 secs timeout
    console.log("Simulating network delivery with payload:", payload);
    const response = await submitFeedbackToAPI(payload, currentApiKey);

    //evaluate the exact response status returned by your server middleware/route
    if(response.status === "success") {
        console.log(`Feedback securely saved to MongoDB with ID: ${response.feedbackId}`);
        updateState({ status: "success" });
    } else {
        updateState({
            status: "error",
            message: response.message || "Failed to submit feedback. Try again later."
        });
    }
    //try {
    //    await new Promise((resolve) => setTimeout(resolve, 1500));

        // Optional: Fail deliberately to test your error state UI
        // throw new Error("Could not connect to server.");

        // 3. Success! Update state so UI shows the thank-you screen
    //    updateState({ status: "success" });
    //} catch (err: any) {
        // 4. Fallback if something goes wrong
    //    updateState({ 
    //    status: "error", 
    //    message: err.message || "Failed to submit feedback. Try again later." 
    //    });
    //}
}

//core initialization runner that bootstraps the entire application
function bootstrapWidget(): void {
    //grab the business key from  the embedding HTML script
    const apiKey = getApiKeyFromScript();
    if(!apiKey) {
        //stop initialization if there is no valid key
        return;
    }
    
    console.log(`Feedback Widget successfully loaded for Business Key: ${apiKey}`);
    // Initialize UI elements and hook up the reactive submission pathway
    initUI((payload) => {
        handleFeedbackSubmit(payload);
    });
    //start the UI in the efault idle state
    updateState({ status: "idle" });
}
// Automatically trigger initialization when this script loads on the host page
if (typeof window !== "undefined") {
  // Run immediately if the DOM is ready, otherwise wait for it to load
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bootstrapWidget);
    } else {
        bootstrapWidget();
    }
}