import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import genTokens from "../utils/token.js";
import { response } from "express";
import authRouter from "../routes/auth.routes.js";
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    console.log("Signup request body:", req.body);

    let user = await User.findOne({ email });
    console.log("Existing user check:", user);

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (!mobile || mobile.length < 10) {
      return res.status(400).json({ message: "Mobile number must be 10 digits long" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    user = await User.create({
      fullName,
      email,
      password: hashPassword,
      mobile,
      role
    });
    console.log("User created:", user._id);
    console.log("Generating token for user ID:", user._id);
    const token = await genTokens(user._id);
    console.log("Token generated:", token);

    res.cookie("token", token, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "strict",
      httpOnly: true
    });

    return res.status(201).json({ message: "User registered successfully", user, token });

  } catch (error) {
    console.error("Error occurred during sign up:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



export const signIn = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = await genTokens(user._id);
        res.cookie("token", token, {
            maxAge: 10 * 24 * 60 * 60 * 1000,
            secure: false,
            sameSite : "strict",
            httpOnly: true
        });
        return res.status(200).json({message: "Sign in successful", user});
        
        
    }
        catch(error){
        console.error("Error occurred during sign in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const signOut =async (params) =>{
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Sign out successful" });
    } catch (error) {
        console.error("Error occurred during sign out:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}