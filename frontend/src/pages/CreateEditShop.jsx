import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

function CreateEditShop(){
    const navigate = useNavigate()
    const {myShopData}=useSelector(state=>state.owner)
    return (
        <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
            <div className="absolute top-[20px] left-[20px] z-[10] mb-[10px]">
                <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" onClick={()=> navigate("/")}/> 
            </div>

            <div className="max-w-lg w-full bg-white- shadow-xl rounded-2xl p-8 border border-orange-100">
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-orange-100 p-4 rounded-full mb-4">
                        <FaUtensils className="w-16 h-16 text-[#ff4d2d]"/>
                    </div>
                    <div className="text-3xl font-extrabold text-gray-900">
                        {myShopData?"Edit Shop":"Add Shop"}
                    </div>
                </div>
            </div>      
        </div>
    )
}

export default CreateEditShop