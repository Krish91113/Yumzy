import React from "react";
import Nav from "./Nav";
import { catgories } from "../category";
import CategoryCard from "./CategoryCard";

function UserDashboard(){
    return (
        <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
            <Nav/>
        <div className="w-full max-w-6xl flex flex-col gap-5 p-[10px] items-start">
            <h1 className="text-gray-800 text-2xl sm:text-3xl">Inspiration for your first order</h1>
            <div className="w-full">
                <div className="w-full flex gap-4 overflow-x-auto pb-3">
                {catgories.map((cate,index)=>{
                    return <CategoryCard key={index} data={cate}/>
                })}
                </div>
            </div>
        </div>
        </div>
    )
}

export default UserDashboard