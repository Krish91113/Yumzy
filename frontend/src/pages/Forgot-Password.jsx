import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Navigate, useNavigate } from "react-router-dom";
function ForgotPassword() {
    const [step,setStep] = useState(1);
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmNewPassword,setConfirmNewPassword] = useState("");
    const navigate = useNavigate();
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
                                    value={email}
                                />
                            </div>
                            <button className="w-full mt-4 bg-orange-500 text-white cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors" onClick={() => setStep(2)}>
                                Send Otp
                            </button>
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
                                    value={otp}
                                />
                            </div>
                            <button className="w-full mt-4 bg-orange-500 text-white cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors" onClick={() => setStep(3)}>
                                Verify now
                            </button>
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
                                    value={newPassword}
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
                                    value={confirmNewPassword}
                                />
                            </div>
                            <button className="w-full mt-4 bg-orange-500 text-white cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors" onClick={() => setStep(4)}>
                                Reset Password
                            </button>
                        </div>
                    )}

                
            </div>
        </div>  
    );
}

export default ForgotPassword;











