import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
function CartItemCard({data}){
    
    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-boder">
            <div className="flex items-center gap-4">
                <img src={data.image} alt="" className="w-20 h-20 object-cover rounded-lg border"/>
                <div>
                    <h1 className="font-bold text-gray-600">{data.name}</h1>
                    <p className="text-sm text-gray-600">₹ {data.price} x {data.quantity}</p>
                    <p className="font-bold text-gray-900">₹{data.price * data.quantity}</p>
                </div>
            </div>

            <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer">
                <button className="px-2 py-1 hover:bg-gray-100 transition" >
                    <FaMinus size={12}/>
                </button>
                <span>{data.quantity}</span>
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer">
                    <FaPlus size={12}/>
                </button>
                <button className="p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200 ">
                    <CiTrash size={18}/>
                </button>
            </div>
        </div>
    )
}
export default CartItemCard