import axios from "axios";
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Navigate, useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
function ForgotPassword() {
    const [step,setStep] = useState(1);
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmNewPassword,setConfirmNewPassword] = useState("");
    const navigate = useNavigate();
    const [err,setErr]=useState("")
    const [loading,setLoading]=useState(false)

    const handleSendOtp =async () =>{
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`, {email},
                { withCredentials: true })
            console.log(result)
            setStep(2);
            setErr("")
            setLoading(false)
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }
    const handleVerifyOtp =async () =>{
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, {email, otp},
                { withCredentials: true })
            console.log(result)
            setStep(3);
            setErr("")
            setLoading(false)
        }catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }

    const handleResetPassword =async () =>{
        setLoading(true)
        if(newPassword !== confirmNewPassword){
            alert("Passwords do not match");
            return;
        }
        try {
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`, {email, newPassword},
                { withCredentials: true })
            console.log(result)
            navigate("/signin");
            setErr("")
            setLoading(false)
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }
    return (
        <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6] ">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                <div className="flex items-center gap-4 mb-4">
                    <IoIosArrowRoundBack  onClick={()=> navigate("/signin")} size={30} className=" cursor-pointer text-[#ff6b6b]" />
                    <h1 className="text-2xl font-bold text-center text-[#ff6b6b]">Forgot Password</h1>
                </div>

                    {step === 1 && (
                        <div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full border-[1px] rounded-lg px-3 py-2 focus:outline-none focus:outline-none "
                                    placeholder="Enter your email"
                                    style={{ border: `1px solid #ff6b6b` }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email} required
                                />
                            </div>
                            <button className="w-full mt-4 bg-orange-500 text-white cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors" disabled={loading} onClick={handleSendOtp}>
                                {loading?<ClipLoader color="white" size={22}/>: "Send OTP"}
                            </button>
                            {err && <p className="text-center text-red-500 my-[10px] font-semibold">*{err}</p>}
                        </div>
                    )}
                
                    {step === 2 && (
                        <div>
                            <div className="mb-6">
                                <label htmlFor="otp" className="block text-gray-700 font-medium mb-1">OTP</label>
                                <input
                                    type="number"
                                    id="otp"
                                    className="w-full border-[1px] rounded-lg px-3 py-2 focus:outline-none focus:outline-none "
                                    placeholder="Enter OTP"
                                    style={{ border: `1px solid #ff6b6b` }}
                                    onChange={(e) => setOtp(e.target.value)}
                                    value={otp} required
                                />
                            </div>
                            <button className="w-full mt-4 bg-orange-500 text-white cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors" disabled={loading} onClick={handleVerifyOtp}>
                                {loading?<ClipLoader color="white" size={22}/>: "Verify Now"}
                            </button>
                           {err && <p className="text-center text-red-500 my-[10px] font-semibold">*{err}</p>}
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <div className="mb-6">
                                <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    className="w-full border-[1px] rounded-lg px-3 py-2 focus:outline-none focus:outline-none "
                                    placeholder="Enter New Password"
                                    style={{ border: `1px solid #ff6b6b` }}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    value={newPassword} required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirmNewPassword" className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirmNewPassword"
                                    className="w-full border-[1px] rounded-lg px-3 py-2 focus:outline-none focus:outline-none "
                                    placeholder=" Confirm Password"
                                    style={{ border: `1px solid #ff6b6b` }}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    value={confirmNewPassword} required
                                />
                            </div>
                            <button className="w-full mt-4 bg-orange-500 text-white cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors" disabled={loading} onClick={handleResetPassword}>
                                {loading?<ClipLoader color="white" size={22}/>: "Reset Password"}
                            </button>
                           {err && <p className="text-center text-red-500 my-[10px] font-semibold">*{err}</p>}
                        </div>
                    )}

                
            </div>
        </div>  
    );
}

export default ForgotPassword;










