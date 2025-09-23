import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { catgories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
function UserDashboard(){
    const cateScrollRef = useRef();
    const [showLeftButton,setShowLeftButton] = useState(false);
    const [showRightButton,setShowRightButton] = useState(true);

    const updateButton =(ref,setLeftButton,setRightButton)=>{
        const element =ref.current;
        if(element){

        }
    }

    const scrollHandler =(ref,direction)=>{
        if(ref.current){
            ref.current.scrollBy({
                left:direction==="left" ? -300 : 300,
                behavior:"smooth"
            })
        }
    }

    useEffect(()=>{
        const handleScroll =()=>{
            updateButton(cateScrollRef,setShowLeftButton,setShowRightButton)
        }
        const scrollContainer = cateScrollRef.current;
        if(scrollContainer){
            scrollContainer.addEventListener("scroll",handleScroll)
        }
        return ()=>{
            if(scrollContainer){
                scrollContainer.removeEventListener("scroll",handleScroll)
            }
        }
    },[cateScrollRef])
    return (
        <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
            <Nav/>
        <div className="w-full max-w-6xl flex flex-col gap-5 p-[10px] items-start">
            <h1 className="text-gray-800 text-2xl sm:text-3xl">Inspiration for your first order</h1>
            <div className="w-full relative">
                <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#fff9f6] rounded-full text-white p-2 z-10 hover:bg-[#ff4d2d] shadow-lg" onClick={()=>scrollHandler(cateScrollRef,"left")}>
                    <FaChevronCircleLeft size={30} className="text-[#ff4d2d]"/>
                </button>
                <div className="w-full flex gap-4 overflow-x-auto pb-3" ref={cateScrollRef}>
                {catgories.map((cate,index)=>{
                    return <CategoryCard key={index} data={cate}/>
                })}
                </div>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#fff9f6] rounded-full text-white p-2 z-10 hover:bg-[#ff4d2d] shadow-lg" onClick={()=>scrollHandler(cateScrollRef,"right")}>
                    <FaChevronCircleRight size={30} className="text-[#ff4d2d]"/>
                </button>
            </div>
        </div>
        </div>
    )
}

export default UserDashboard