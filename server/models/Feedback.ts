
import {Schema, model, Document} from "mongoose";

export interface IFeedback extends Document {
    businessId: Schema.Types.ObjectId; //links directly back to User model
    text: string;
    rating?: number;
    source: "website" | "api" | "instagram" | "whatsapp";
    createdAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>({
    businessId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    text: {type: String, required: true, trim: true},
    rating: {type: Number, min:1, max: 5}, //enforces 1 -5
    source: {type: String, enum: ["website", "api", "instagram", "whatsapp"], default: "website"},
    createdAt: {type: Date, default: Date.now}
});

export const Feedback = model<IFeedback>("Feedback", FeedbackSchema);