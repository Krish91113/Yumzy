import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { catgories } from "../category";
import CategoryCard from "./CategoryCard";
import FoodCard from "./FoodCard";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import useGetShopByCity from "../hooks/useGetShopByCity";
import useGetItemsByCity from "../hooks/useGetItemsByCity";

function UserDashboard() {
  useGetShopByCity(); // fetch shops
  useGetItemsByCity(); // fetch food items

  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(true);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const { currentCity, shopInMyCity, itemInMyCity } = useSelector(state => state.user);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(element.scrollWidth > element.clientWidth + element.scrollLeft);
    }
  };

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
    };

    const cateEl = cateScrollRef.current;
    const shopEl = shopScrollRef.current;

    if (cateEl) cateEl.addEventListener("scroll", handleScroll);
    if (shopEl) shopEl.addEventListener("scroll", handleScroll);

    handleScroll(); // initial

    return () => {
      if (cateEl) cateEl.removeEventListener("scroll", handleScroll);
      if (shopEl) shopEl.removeEventListener("scroll", handleScroll);
    };
  }, [catgories]);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-8 items-center bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-y-auto relative">
      {/* Decorative background elements using Tailwind only */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Top-left gradient circle */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-200 opacity-30 rounded-full blur-3xl"></div>
        {/* Bottom-right gradient circle */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-200 opacity-30 rounded-full blur-3xl"></div>
        {/* Center decorative element */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-100 via-transparent to-red-100 opacity-40 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation Component */}
      <Nav />

      {/* Categories Section */}
      <div className="w-full max-w-7xl flex flex-col gap-6 px-6 lg:px-8 items-start relative z-10">
        {/* Section Header with gradient text and decorative line */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-800 text-3xl sm:text-4xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                Inspiration for your first order
              </span>
            </h1>
            {/* Animated underline */}
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transform transition-all duration-300 hover:w-32"></div>
          </div>
          {/* Decorative element */}
          <div className="hidden sm:flex flex-1 items-center ml-8">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-orange-200 via-orange-100 to-transparent"></div>
          </div>
        </div>
        
        {/* Categories Carousel Container */}
        <div className="w-full relative group">
          {/* Left scroll button with enhanced styling */}
          {showLeftCateButton && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-95 backdrop-blur-sm rounded-full p-3 z-20 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 border border-orange-100"
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaChevronCircleLeft size={28} className="text-orange-500 drop-shadow-sm hover:text-red-500 transition-colors" />
            </button>
          )}
          
          {/* Categories scroll container with Tailwind scrollbar utilities */}
          <div 
            className="w-full flex gap-5 overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
            ref={cateScrollRef}
          >
            {catgories.map((cate, index) => (
              <div 
                key={index}
                className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <CategoryCard name={cate.category} image={cate.image} />
              </div>
            ))}
          </div>
          
          {/* Right scroll button with enhanced styling */}
          {showRightCateButton && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-95 backdrop-blur-sm rounded-full p-3 z-20 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 border border-orange-100"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaChevronCircleRight size={28} className="text-orange-500 drop-shadow-sm hover:text-red-500 transition-colors" />
            </button>
          )}
          
          {/* Gradient fade edges for better visual */}
          <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white via-white to-transparent pointer-events-none z-10 opacity-80"></div>
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-white via-white to-transparent pointer-events-none z-10 opacity-80"></div>
        </div>
      </div>

      {/* Shops Section with enhanced styling */}
      <div className="w-full max-w-7xl flex flex-col gap-6 px-6 lg:px-8 items-start relative z-10">
        {/* Section header with city highlight */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-800 text-3xl sm:text-4xl font-bold">
              Best Shops in{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-extrabold">
                {currentCity || "your city"}
              </span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full transform transition-all duration-300 hover:w-32"></div>
          </div>
          <div className="hidden sm:flex flex-1 items-center ml-8">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-red-200 via-red-100 to-transparent"></div>
          </div>
        </div>
        
        {/* Shops Carousel Container */}
        <div className="w-full relative group">
          {showLeftShopButton && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-95 backdrop-blur-sm rounded-full p-3 z-20 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 border border-red-100"
              onClick={() => scrollHandler(shopScrollRef, "left")}
            >
              <FaChevronCircleLeft size={28} className="text-red-500 drop-shadow-sm hover:text-orange-500 transition-colors" />
            </button>
          )}
          
          <div 
            className="w-full flex gap-5 overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
            ref={shopScrollRef}
          >
            {shopInMyCity && shopInMyCity.length > 0 ? (
              shopInMyCity.map((shop, index) => (
                <div 
                  key={index}
                  className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <CategoryCard image={shop.image} name={shop.name} />
                </div>
              ))
            ) : (
              <div className="w-full py-12 flex flex-col items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm rounded-2xl border border-gray-200">
                <div className="text-6xl mb-4 animate-bounce">🏪</div>
                <p className="text-gray-600 text-lg font-semibold">No shops found in this city</p>
                <p className="text-gray-400 text-sm mt-2">Check back later for new additions!</p>
              </div>
            )}
          </div>
          
          {showRightShopButton && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-95 backdrop-blur-sm rounded-full p-3 z-20 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 border border-red-100"
              onClick={() => scrollHandler(shopScrollRef, "right")}
            >
              <FaChevronCircleRight size={28} className="text-red-500 drop-shadow-sm hover:text-orange-500 transition-colors" />
            </button>
          )}
          
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white via-white to-transparent pointer-events-none z-10 opacity-80"></div>
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-white via-white to-transparent pointer-events-none z-10 opacity-80"></div>
        </div>
      </div>

      {/* Food Items Section with grid layout */}
      <div className="w-full max-w-7xl flex flex-col gap-6 px-6 lg:px-8 items-start relative z-10 pb-12">
        {/* Section header */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-800 text-3xl sm:text-4xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                Suggested Food Items
              </span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transform transition-all duration-300 hover:w-32"></div>
          </div>
          <div className="hidden sm:flex flex-1 items-center ml-8">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-orange-200 via-orange-100 to-transparent"></div>
          </div>
        </div>
        
        {/* Food items grid with responsive layout */}
        <div className="w-full">
          {itemInMyCity && itemInMyCity.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
              {itemInMyCity.map((item, index) => (
                <div 
                  key={index}
                  className="transform transition-all duration-500 hover:scale-[1.02]"
                >
                  <FoodCard data={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm rounded-3xl border-2 border-dashed border-orange-200">
              <div className="text-8xl mb-6 animate-pulse">🍽️</div>
              <p className="text-gray-700 text-xl font-bold">No food items available</p>
              <p className="text-gray-500 text-base mt-3">We're adding new items soon!</p>
              <button className="mt-6 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-red-500 hover:to-orange-500">
                Explore Other Cities
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;