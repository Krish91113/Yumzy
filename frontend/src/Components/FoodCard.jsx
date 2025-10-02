import React, { useState } from "react";
import { FaDrumstickBite } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
function FoodCard({data}){
    const [quantity,setQuantity]=useState(0);
    const renderStars=(rating)=>{
        const stars=[];
        for(let i=1;i<=5;i++){
            stars.push(
                (i<=rating)?(<FaStar  className="text-yellow-700 text-lg"/>):
                (<FiStar className="text-yellow-700 text-lg" />)
            )
        }
        return stars
    }

    const handleIncrease =()=>{
        const newQty=quantity+1;
        setQuantity(newQty)
    }
    const handleDecrease =()=>{
        if(quantity>0){
            const newQty=quantity-1;
            setQuantity(newQty)
        }
        
    }

    return (
        <div className="w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative w-full h-[170px] flex justify-center items-center bg-white ">
                <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
                {data.foodType=="veg"? <FaLeaf className="text-green-600 text-lg"/>:<FaDrumstickBite  className="text-red-600 text-lg"/>}
                </div>

                <img src={data.image} alt="" className="w-full h-full object-cover transition-transofrm duration-300 hover:scale-105"/>
            </div>

            <div className="flex-1 flex flex-col p-4">
                <h1 className="font-semibold text-gray-900 text-base truncate">{data.name}</h1>
                <div className="flex items-center gap-1 mt-1">
                {renderStars(data.rating?.average || 0)}
                <span>{data.rating?.count || 0}</span>
            </div>
            </div>
            <div className="flex items-center justify-between mt-auto p-4 ">
                <span className="font-bold text-gray-900 text-lg">
                    {data.price}
                </span>
                <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
                    <button className="px-2 py-1 hover:bg-gray-100 transitions" onClick={handleDecrease}>
                        <FaMinus size={16}/>
                    </button>
                    <span>
                        {quantity}
                    </span>
                    <button className="px-2 py-1 hover:bg-gray-100 transitions" onClick={handleIncrease}>
                        <FaPlus size={16} />
                    </button>
                    <button className="bg-[#ff4d2d] text-white px-3 py-2 transition-colors">
                        <FaShoppingCart />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default FoodCard