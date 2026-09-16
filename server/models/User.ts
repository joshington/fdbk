
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    businessName: string;
    email: string;
    passwordHash: string;
    apiKey: string;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    businessName: {type: String, required: true},
    email: {type: String, required:true, unique:true, lowercase:true, trim: true},
    passwordHash: {type: String, required: true},
    apiKey: {type: String, required: true, unique: true},//key passed in widget headers
    createdAt: {type: Date, default: Date.now}
});

export const User = model<IUser>("User", UserSchema);
