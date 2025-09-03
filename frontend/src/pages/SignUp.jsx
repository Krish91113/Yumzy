import React from "react";

function SignUp(){
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";


    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] `} style={{
                 border : `5px solid ${borderColor}`
                 }}>
                <h1 className={`text-3xl font-bold mb-2 `} style={{ color: primaryColor }}>YumzY</h1>
                <p className="text-gray-600 mb-8">Create Your account to get started with deelicious food deliveries</p>
            </div>
        </div>
    )
}
export default SignUp;