
import type {UIState, FeedbackPayload, ProductRating} from "./types";
import {injectStyles} from "./styles";


//keep track of internal DOM references, so we can update them cleanly
let container:  HTMLDivElement | null = null;
let triggerButton: HTMLButtonElement | null = null 
let formCard: HTMLDivElement | null = null;
let textarea: HTMLTextAreaElement | null = null;
let submitButton: HTMLButtonElement | null = null;
let statusMessageContainer: HTMLDivElement | null = null;
let starElements: HTMLButtonElement[] = [];

//Track the users current selection inside the open form
let selectedRating: ProductRating | undefined = undefined;

/**
 * Initializes the UI DOM elements and injects styles.
 * Accepts an onSubmit callback so widget.ts can handle the actual network delivery.
 */

export function initUI(onSubmit: (payload: FeedbackPayload) => void): void {
    //inject our styles into the document head
    injectStyles(); //loading the styles

    //create a global isolated container for our widget elements
    container = document.createElement("div");
    container.id = "feedback-widget-root";

    // 3. Create the Floating Trigger Button
    triggerButton = document.createElement("button");
    triggerButton.className =   "feedback-widget-trigger";
    triggerButton.innerText = "Feedback";
    triggerButton.onclick = () => toggleForm();

    //4 = create the main feedback Form Card
    formCard = document.createElement("div");
    formCard.className = "feedback-widget-card";


    const closeButton = document.createElement("button");
    closeButton.className = "feedback-widget-close";
    closeButton.innerHTML = "&times;"; // HTML code for the multiplication 'X' sign
    closeButton.type = "button";
    closeButton.onclick = () => {
        // When clicked, reset the UI back to idle state
        render({ status: "idle" });
    };

    const header = document.createElement("h3");
    header.className = "feedback-widget-header";
    header.innerText = "Send us your feedback";

    textarea = document.createElement("textarea");
    textarea.className = "feedback-widget-textarea";
    textarea.placeholder = "What can we improve?";

    // 5. Create Star Rating DOM
    const ratingContainer = document.createElement("div");
    ratingContainer.className = "feedback-widget-rating-container";

    starElements = [1,2,3,4,5].map((num) => {
        const star = document.createElement("button");
        star.className = "feedback-widget-star";
        star.innerHTML = "&#9733;"; // Star symbol code
        star.type = "button";
        star.onclick = () => selectStar(num as ProductRating);
        ratingContainer.appendChild(star);
        return star;
    });

    // create status message container and submit button
    statusMessageContainer = document.createElement("div");

    submitButton = document.createElement("button");
    submitButton.className = "feedback-widget-submit";
    submitButton.innerText = "Submit";
    //disable the button by default when firrst initialized
    submitButton.disabled = true;
    //listen to typing events to dynamically toggle the button
    textarea.oninput = () => {
        if(!textarea || !submitButton) return;
        const hasText = textarea.value.trim().length > 0;
        submitButton.disabled = !hasText;
    };
    submitButton.onclick= () => {
        if (!textarea || !textarea.value.trim())  return;

        //trigger the callback with our payload values
        onSubmit({
            text: textarea.value.trim(),
            rating: selectedRating,
            source: "website" //hardcoded here
        });
    };

    //assemble the cpts together and mount to the page body
    formCard.appendChild(closeButton);
    formCard.appendChild(header);
    formCard.appendChild(textarea);
    formCard.appendChild(ratingContainer);
    formCard.appendChild(statusMessageContainer);
    formCard.appendChild(submitButton);

    container.appendChild(triggerButton);
    container.appendChild(formCard);
    document.body.appendChild(container);
}

/**
 * Toggles the card view visibility manually between Open and Idle
 */

function toggleForm(): void {
    if (!formCard) return;
    formCard.classList.toggle("open");
}

/**
 * Updates the visual selection highlight for the rating stars
 */

function selectStar(rating: ProductRating): void {
    selectedRating = rating;
    starElements.forEach((star, index) => {
        if (index < rating) {
            star.classList.add("selected");
        } else {
            star.classList.remove("selected");
        }
    });
}

/**
 * THE CORE ENGINE: Reacts explicitly to whatever state is passed down to it
 */

export function render(state: UIState): void {
    if (!formCard || !textarea || !submitButton || !statusMessageContainer) return

    //clear out prior states first
    statusMessageContainer.className = "feedback-widget-status-msg";
    statusMessageContainer.innerText = "";

    switch (state.status) {
        case "idle":
            formCard.classList.remove("open");
            textarea.value = "";
            selectStar(0 as any); //clear stars safely
            submitButton.disabled = true;
            submitButton.innerText = "Submit";
            break;
        case "formOpen":
            formCard.classList.add("open");
            break;
        case "submitting":
            textarea.disabled = true;
            submitButton.disabled = true;
            submitButton.innerText = "Sending...";
            break;
        case "success":
            textarea.value = "";
            textarea.disabled = false;
            selectStar(0 as any);
            submitButton.style.display = "none";
            textarea.style.display = "none";
            starElements.forEach( s => s.style.display = "none");

            statusMessageContainer.innerText = "Thank you! Your feedback has been sent"

            //reset back to normal after 3 secs automatically
            setTimeout(() => {
                submitButton!.style.display = "block";
                submitButton!.disabled = false;
                submitButton!.innerText = "Submit";

                textarea!.style.display = "block";
                starElement.forEach(s => s.style.display = "block");
                render({status: "idle"});
            }, 3000);
            break;
        case "error":
            textarea.disabled = false;
            submitButton.disabled = false;
            submitButton.innerText = "Submit";
            statusMessageContainer.classList.add("error");
            statusMessageContainer.innerText = state.message || "Something went wrong".
            break;
    }
}