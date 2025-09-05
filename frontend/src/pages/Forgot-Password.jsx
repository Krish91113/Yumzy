import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
function ForgotPassword() {
    const [step,setStep] = useState(1);

    return (
        <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6] ">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                <div className="flex items-center gap-4 mb-4">
                    <IoIosArrowRoundBack size={30} className="text-[#ff6b6b]" />
                    <h1 className="text-2xl font-bold text-center text-[#ff6b6b]">Forgot Password</h1>
                </div>
                <div>
                    {step === 1 && (
                        <div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-orange-500"
                                    placeholder="Enter your email"
                                    style={{ border: `1px solid #ff6b6b` }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>  
    );
}

export default ForgotPassword;











