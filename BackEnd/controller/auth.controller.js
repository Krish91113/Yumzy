import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import genTokens from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

// cookie config (reuse everywhere)
const cookieOptions = {
  maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production", // true only on HTTPS
};

// ========================== SIGN UP ==========================
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    console.log("Signup request body:", req.body);

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ message: "Mobile number must be exactly 10 digits" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullName,
      email,
      password: hashPassword,
      mobile,
      role,
    });

    const token = await genTokens(user._id);
    res.cookie("token", token, cookieOptions);

    return res.status(201).json({ message: "User registered successfully", user, token });
  } catch (error) {
    console.error("Error occurred during sign up:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ========================== SIGN IN ==========================
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await genTokens(user._id);
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({ message: "Sign in successful", user, token });
  } catch (error) {
    console.error("Error occurred during sign in:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ========================== SIGN OUT ==========================
export const signOut = (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error occurred during sign out:", error.message);
    return res.status(500).json({ message: "Server error during logout" });
  }
};

// ========================== SEND OTP ==========================
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 min expiry
    user.isOtpVerified = false;
    await user.save();

    await sendOtpMail(email, otp);
    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error occurred while sending OTP:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ========================== VERIFY OTP ==========================
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || String(user.resetOtp) !== String(otp) || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error occurred while verifying OTP:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ========================== RESET PASSWORD ==========================
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verification required" });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error occurred while resetting password:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ========================== GOOGLE AUTH ==========================
export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobile,
        role,
      });
    }

    const token = await genTokens(user._id);
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({ message: "Google Auth successful", user, token });
  } catch (error) {
    console.error("Error occurred during Google Auth:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
