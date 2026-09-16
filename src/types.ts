
//what the widget sends - the shape of the feedback submission(text, optional rating,
// -- the widget key, source)
//== what the widget expects back -  a success response shape, and what error
// response looks like, so ui.ts can react correctly to either.

//the types here are for the payload and response  and the UI state
// 1- outgoing payload - what you send to /v1/feedback- (text, rating?, source)
// 2 - response shape - the descriminated union for success/error coming back from API
// 3 - UI state - the descriminate union representing what the widget is currently
// displaying (idle, form open, submitting, success, error)

type Source = "website" | "api" | "instagram" | "whatsapp"


type ProductRating = 1 | 2 | 3 | 4 | 5;

export interface FeedbackPayload {
    text: string;
    rating?: ProductRating;
    source: Source;
}

//now what about the response 
export type SubmitResponse  = 
    | { status: "success"; feedbackId:  string }
    | { status: "error"; message: string };

//now the UIState
export type UIState =
  | { status: "idle" }
  | { status: "formOpen" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };


export interface ApiConfig {
    apiKey: string;
    baseUrl: string;
}