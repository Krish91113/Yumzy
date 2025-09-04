import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
function SignUp(){
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("user");
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

                {/* {{RRoles}} */}

                <div className="mb-4"> 
                    <label htmlFor="Roles" className="block text-gray-700 font-medium mb-1">Roles   </label>
                    <div className="flex gap-4">
                        {["user","owner","deliveryboy"].map((r)=>(
                            <button className="flex-1 border rounded-lg px-3 py-2 text-center font-medium cursor-pointer transition-colors"
                            onClick={()=>setRole(r)}
                            style={
                                role==r?
                                { backgroundColor: primaryColor, color: 'white' } : {border:`1px solid ${primaryColor}`, color: primaryColor}
                            }
                            >{r}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <button className="w-full mt-4 bg-orange-500 text-white cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                        Sign up
                    </button>

                    <button className=" w-full mt-4 w-full border border-gray-100 rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-300 cursor-pointer transition-colors transition-duration-200">
                        <FcGoogle size={20} />
                        <span>Sign up with Google</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default SignUp;