
import {Router} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {User} from "../models/User";

const router = Router();

//now signup route
//post api/suth/signup
router.post("/signup", async (req, res): Promise<any> => {
    try {
        const  {businessName, email, password} = req.body;
        //basic validation
        if(!businessName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        //2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: "Email is already registered"});
        }

        //securely hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        //generate a unique public API key for their widget
        const apiKey = `fdbk_live_${crypto.randomBytes(16).toString("hex")}`;
        //save the user to mongodb
        const newUser = new User({
            businessName,email,passwordHash,apiKey
        });
        await newUser.save();

        res.status(201).json({
            message: "Business account registered successfully",
            apiKey: newUser.apiKey //return so that they can immedicately copy to widget
        });
    } catch (error){
        console.error("Signup error:", error);
        res.status(500).json({message: "Server error during registration"});
    }
});

//login route - POST /api/auth/login
router.post("/login", async (req, res): Promise<any> => {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required"});
        }
        //find user by email
        const user = await User.findOne({ email });
        if (!user){
            return res.status(400).json({message: "Invalid credentials"});
        }

        ///2 verify hash password matches
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        //generate a secure JWT session token (expires in 7 days)
        const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
        const token = jwt.sign(
            {userId: user._id, businessName: user.businessName},
            jwtSecret,
            {expiresIn: "7d"}
        );
        res.status(200).json({
            token,
            business: {
                id: user._id,
                businessName: user.businessName,
                email:user.email,
                apiKey: user.apiKey
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login"});
    }
});

export default router;