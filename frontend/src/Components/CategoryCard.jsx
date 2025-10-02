import React from "react";


function CategoryCard ({name, image}){
    return (
        <div className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-2xl border-2 border-[#ff4d2d] shrink-0 bg-white shadow-xl shadow-gray-200  overflow-hidden cursor-pointer hover:scale-105 duration-300 relative">
            <img src={image}  className="w-full h-full object-cover" />
            <div>
                <h1 className="absolute bottom-0 left-0 w-full bg-[#ffffff96] bg-opacity-95 px-3 py-1 rounded-t-xl text-center shadow text-white font-medium text-lg text-gray-800 md:text-xl backdrop-blur">{name}</h1>
            </div>
        </div>
    );
}
export default CategoryCard;