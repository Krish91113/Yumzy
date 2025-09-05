import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import genTokens from "../utils/token.js";
import { response } from "express";
import authRouter from "../routes/auth.routes.js";
import { sendOtpMail } from "../utils/mail.js";
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

export const sendOtp = async (req, res) =>{
  try {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message: "User not found"});
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; 
    user.isOtpVerified = false;
    await user.save();
    await sendOtpMail(email, otp);
    return res.status(200).json({message: "OTP sent to your email"});
    
  } catch (error) {
    console.error("Error occurred while sending OTP:", error);
    return res.status(500).json({ message: `send otp error ${error.message}` });
  }
}

export const verifyOtp = async (req, res) => {
  try {
    const {email,otp} = req.body;
    const user=await User.findOne({email});
    if(!user || user.resetOtp !=otp || user.otpExpires < Date.now()){
      return res.status(400).json({message: "Invalid or expired OTP"});
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({message: "OTP verified successfully"});
  } catch (error) {
    console.error("Error occurred while verifying OTP:", error);
    return res.status(500).json({ message: `verify otp error ${error.message}` });
  }
}

export const resetPassword = async (req, res) => {
  try {
      const {email, newPassword} = req.body;
      const user = await User.findOne({email});
      if(!user || !user.isOtpVerified){
      return res.status(400).json({message: "otp verification required"});
    }
    const hashedPassword =await bcrypt.hash(newPassword,10)
    user.password=hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({message: "Password reset successful"});
  } catch (error) {
    console.error("Error occurred while resetting password:", error);
    return res.status(500).json({ message: `reset password error ${error.message}` });
  }
}

export const googleAuth = async (req, res) => {
  try {
      const {fullName, email, mobile} = req.body;
      let user = await User.findOne({email})
      if(!user){
         user = await User.create({
           fullName,
           email,
           mobile,
         })
      const token = await genTokens(user._id)
        res.cookie("token", token, {
             maxAge: 10 * 24 * 60 * 60 * 1000,
             secure: false,
             sameSite: "strict",
             httpOnly: true
             });

            return res.status(201).json({ message: "User registered successfully", user, token });
      }
  } catch (error) {
      return res.status(500).json({ message: `google auth error ${error.message}` });
  }
}