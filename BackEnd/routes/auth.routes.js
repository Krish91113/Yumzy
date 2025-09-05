import express from "express"
import { resetPassword, sendOtp, signIn, signOut, signUp, verifyOtp } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)
authRouter.get("/signout", signOut)
authRouter.get("/send-otp", sendOtp)
authRouter.get("/verify-otp", verifyOtp)
authRouter.get("/reset-password", resetPassword)



export default authRouter