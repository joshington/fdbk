
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import feedbackRoutes from "./routes/feedback";
import analyticsRoutes from "./routes/analytics";

//load envt configs
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors()); //allows cross-origin widget network requests
app.use(express.json()); //parses incoming JSON payloads automatically

app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/analytics", analyticsRoutes); //mount analytics endpoints

//simple health check route
app.get("/health",  (req, res) => {
    res.status(200).json({status: "ok", message: "Server is healthy"});
});

//DB connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error("Critical Error: MONGO_URI missing in evt variables");
    process.exit(1);
}

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log("Connected to -MongoDB Database successfully");
        //start listening on port once DB links up
        app.listen(PORT, () => {
            console.log(` Backend Server is humming on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Failed Error:", err);
    })