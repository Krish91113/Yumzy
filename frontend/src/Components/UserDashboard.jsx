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
  // Custom hook to fetch shops based on current city
  useGetShopByCity();
  
  // Custom hook to fetch food items based on current city
  useGetItemsByCity();

  // Reference for category carousel scroll container
  const cateScrollRef = useRef();
  
  // Reference for shop carousel scroll container
  const shopScrollRef = useRef();
  
  // State to show/hide left scroll button for categories
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  
  // State to show/hide right scroll button for categories
  const [showRightCateButton, setShowRightCateButton] = useState(true);
  
  // State to show/hide left scroll button for shops
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  
  // State to show/hide right scroll button for shops
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  // Get current city, shops and items from Redux store
  const { currentCity, shopInMyCity, itemInMyCity } = useSelector(state => state.user);

  // Function to update scroll button visibility based on scroll position
  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(element.scrollWidth > element.clientWidth + element.scrollLeft);
    }
  };

  // Function to handle smooth scrolling left or right
  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth"
      });
    }
  };

  // Effect to set up scroll event listeners and update button visibility
  useEffect(() => {
    // Handler function to update all scroll buttons
    const handleScroll = () => {
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
    };

    // Get current element references
    const cateEl = cateScrollRef.current;
    const shopEl = shopScrollRef.current;

    // Add scroll event listeners
    if (cateEl) cateEl.addEventListener("scroll", handleScroll);
    if (shopEl) shopEl.addEventListener("scroll", handleScroll);

    // Initial button state update
    handleScroll();

    // Cleanup: remove event listeners on unmount
    return () => {
      if (cateEl) cateEl.removeEventListener("scroll", handleScroll);
      if (shopEl) shopEl.removeEventListener("scroll", handleScroll);
    };
  }, [catgories]);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-10 items-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 overflow-y-auto relative">
      {/* Decorative background elements - floating gradient orbs for visual appeal */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top-left decorative gradient circle */}
        <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-orange-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Bottom-right decorative gradient circle */}
        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Center decorative gradient element */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-orange-200 via-transparent to-red-200 opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation Component - sticky header */}
      <div className="w-full sticky top-0 z-50">
        <Nav />
      </div>

      {/* Categories Section - horizontal scrollable carousel */}
      <div className="w-full max-w-7xl flex flex-col gap-8 px-4 sm:px-6 lg:px-8 items-start relative z-10">
        {/* Section Header with gradient text and animated underline */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-3">
            {/* Main heading with gradient text effect */}
            <h1 className="text-gray-800 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Inspiration for your first order
              </span>
            </h1>
            
            {/* Animated underline decoration */}
            <div className="h-1.5 w-28 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full shadow-lg"></div>
          </div>
          
          {/* Decorative divider line - hidden on mobile */}
          <div className="hidden sm:flex flex-1 items-center ml-8">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-orange-300 via-red-200 to-transparent rounded-full"></div>
          </div>
        </div>
        
        {/* Categories Carousel Container with scroll buttons */}
        <div className="w-full relative group">
          {/* Left scroll button - shows on hover when content is scrollable */}
          {showLeftCateButton && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-full p-4 z-20 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 border-2 border-orange-200 hover:border-orange-400"
              onClick={() => scrollHandler(cateScrollRef, "left")}
              aria-label="Scroll categories left"
            >
              <FaChevronCircleLeft size={32} className="text-orange-500 drop-shadow-md hover:text-red-500 transition-colors duration-300" />
            </button>
          )}
          
          {/* Categories scroll container - horizontal scrolling with hidden scrollbar */}
          <div 
            className="w-full flex gap-6 overflow-x-auto pb-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
            ref={cateScrollRef}
          >
            {/* Map through categories and render CategoryCard for each */}
            {catgories.map((cate, index) => (
              <div 
                key={index}
                className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer"
              >
                <CategoryCard name={cate.category} image={cate.image} />
              </div>
            ))}
          </div>
          
          {/* Right scroll button - shows on hover when content is scrollable */}
          {showRightCateButton && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-full p-4 z-20 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 border-2 border-orange-200 hover:border-orange-400"
              onClick={() => scrollHandler(cateScrollRef, "right")}
              aria-label="Scroll categories right"
            >
              <FaChevronCircleRight size={32} className="text-orange-500 drop-shadow-md hover:text-red-500 transition-colors duration-300" />
            </button>
          )}
          
          {/* Gradient fade edges for smooth visual transition */}
          <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-orange-50 via-red-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-orange-50 via-red-50 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>

      {/* Shops Section - horizontal scrollable carousel showing shops in current city */}
      <div className="w-full max-w-7xl flex flex-col gap-8 px-4 sm:px-6 lg:px-8 items-start relative z-10">
        {/* Section header with city name highlighted */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-3">
            {/* Main heading with dynamic city name */}
            <h1 className="text-gray-800 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              Best Shops in{" "}
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent font-black drop-shadow-sm">
                {currentCity || "your city"}
              </span>
            </h1>
            
            {/* Animated underline decoration with reverse gradient */}
            <div className="h-1.5 w-28 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-full shadow-lg"></div>
          </div>
          
          {/* Decorative divider line - hidden on mobile */}
          <div className="hidden sm:flex flex-1 items-center ml-8">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-red-300 via-pink-200 to-transparent rounded-full"></div>
          </div>
        </div>
        
        {/* Shops Carousel Container with scroll buttons */}
        <div className="w-full relative group">
          {/* Left scroll button for shops - shows on hover */}
          {showLeftShopButton && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-full p-4 z-20 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 border-2 border-red-200 hover:border-red-400"
              onClick={() => scrollHandler(shopScrollRef, "left")}
              aria-label="Scroll shops left"
            >
              <FaChevronCircleLeft size={32} className="text-red-500 drop-shadow-md hover:text-orange-500 transition-colors duration-300" />
            </button>
          )}
          
          {/* Shops scroll container - horizontal scrolling */}
          <div 
            className="w-full flex gap-6 overflow-x-auto pb-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
            ref={shopScrollRef}
          >
            {/* Conditional rendering: show shops if available, otherwise show empty state */}
            {shopInMyCity && shopInMyCity.length > 0 ? (
              // Map through shops and render CategoryCard for each shop
              shopInMyCity.map((shop, index) => (
                <div 
                  key={index}
                  className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer"
                >
                  <CategoryCard image={shop.image} name={shop.name} />
                </div>
              ))
            ) : (
              // Empty state when no shops found in the city
              <div className="w-full py-16 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm rounded-3xl border-2 border-dashed border-orange-300 shadow-lg">
                <div className="text-8xl mb-6 animate-bounce">🏪</div>
                <p className="text-gray-700 text-2xl font-bold">No shops found in this city</p>
                <p className="text-gray-500 text-lg mt-3">Check back later for new additions!</p>
              </div>
            )}
          </div>
          
          {/* Right scroll button for shops - shows on hover */}
          {showRightShopButton && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-full p-4 z-20 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 border-2 border-red-200 hover:border-red-400"
              onClick={() => scrollHandler(shopScrollRef, "right")}
              aria-label="Scroll shops right"
            >
              <FaChevronCircleRight size={32} className="text-red-500 drop-shadow-md hover:text-orange-500 transition-colors duration-300" />
            </button>
          )}
          
          {/* Gradient fade edges for smooth visual transition */}
          <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-orange-50 via-red-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-orange-50 via-red-50 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>

      {/* Food Items Section - responsive grid layout showing available food items */}
      <div className="w-full max-w-7xl flex flex-col gap-8 px-4 sm:px-6 lg:px-8 items-start relative z-10 pb-16">
        {/* Section header for food items */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-3">
            {/* Main heading for food items section */}
            <h1 className="text-gray-800 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Suggested Food Items
              </span>
            </h1>
            
            {/* Animated underline decoration */}
            <div className="h-1.5 w-28 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full shadow-lg"></div>
          </div>
          
          {/* Decorative divider line - hidden on mobile */}
          <div className="hidden sm:flex flex-1 items-center ml-8">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-orange-300 via-red-200 to-transparent rounded-full"></div>
          </div>
        </div>
        
        {/* Food items grid container */}
        <div className="w-full">
          {/* Conditional rendering: show food items if available, otherwise show empty state */}
          {itemInMyCity && itemInMyCity.length > 0 ? (
            // Responsive grid layout for food items
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
              {/* Map through food items and render FoodCard for each */}
              {itemInMyCity.map((item, index) => (
                <div 
                  key={index}
                  className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer w-full"
                >
                  <FoodCard data={item} />
                </div>
              ))}
            </div>
          ) : (
            // Empty state when no food items available
            <div className="w-full py-24 flex flex-col items-center justify-center bg-gradient-to-br from-white/70 to-orange-50/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-orange-300 shadow-xl">
              <div className="text-9xl mb-8 animate-pulse">🍽️</div>
              <p className="text-gray-800 text-3xl font-extrabold">No food items available</p>
              <p className="text-gray-600 text-lg mt-4 mb-8">We're adding new delicious items soon!</p>
              
              {/* Call to action button to explore other cities */}
              <button className="px-10 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-lg font-bold rounded-full hover:shadow-2xl transform hover:scale-110 transition-all duration-300 hover:from-pink-500 hover:via-red-500 hover:to-orange-500 shadow-lg">
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