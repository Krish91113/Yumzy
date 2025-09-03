import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
function SignUp(){
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] `} style={{
                 border : `5px solid ${borderColor}`
                 }}>
                <h1 className={`text-3xl font-bold mb-2 `} style={{ color: primaryColor }}>YumzY</h1>
                <p className="text-gray-600 mb-8">Create Your account to get started with deelicious food deliveries</p>

                {/* {FullName} */}

                <div className="mb-4"> 
                    <label htmlFor="fullname" className="block text-gray-700 font-medium mb-1">Full Name</label>
                    <input type="text" id="fullname" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-orange-500" placeholder="Enter your full name" style={{border : `1px solid ${borderColor}`}} />
                </div>

                {/* {{email}} */}
                <div className="mb-4"> 
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                    <input type="email" id="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-orange-500" placeholder="Enter your email" style={{border : `1px solid ${borderColor}`}} />
                </div>
                {/* {{Mobile}} */}
                <div className="mb-4"> 
                    <label htmlFor="mobile" className="block text-gray-700 font-medium mb-1">Mobile</label>
                    <input type="tel" id="mobile" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-orange-500" placeholder="Enter your mobile number" style={{border : `1px solid ${borderColor}`}} />
                </div>
                {/* {{Password}} */}

                <div className="mb-4"> 
                    <label htmlFor="Password" className="block text-gray-700 font-medium mb-1">Password</label>
                    <div className="relative">
                        
                    <input type={`${showPassword?"text":"password"}`} id="Password" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-orange-500" placeholder="Enter your Password" style={{border : `1px solid ${borderColor}`}} />
                    <button className="absolute top-[12px] right-3 cursor-pointer text-gray-900" onClick={() => setShowPassword(!showPassword)}>{!showPassword?<IoEye />:<IoEyeOffOutline />}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp;