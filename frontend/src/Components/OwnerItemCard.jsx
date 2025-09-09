import React from "react";
import { FaPen } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function OwnerItemCard({data}){

    const navigate = useNavigate()
    return (
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl">
            <div className="w-36 h-full flex-shrink-0 bg-gray-50">
                <img src={data.image}  className="w-full  " alt="" />
            </div>
            <div className="flex flex-col justify-between p-3 flex-1 ">
                <div>
                    <h2 className="text-base font-semibold text-[#ff4d2d]">{data.name}</h2>
                    <p><span className="font-medium text-gray-700">Category :</span>{data.category}</p>
                    <p><span className="font-medium text-gray-700">Food Type: </span>{data.foodType}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-[#ff4d2d] font-bold ">{data.price}</div>
                    <div className="flex items-center gap-2">
                        <div className="p-2 cursor-pointer  rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] " onClick={()=>navigate(`/edit-item/${data._id}`)}>
                            <FaPen size={16} />
                        </div>
                        <div className="p-2 cursor-pointer rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] ">
                            <FaTrash size={16}/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default OwnerItemCard