import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { catgories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import useGetShopByCity from "../hooks/useGetShopByCity"; // make sure path is correct
import FoodCard from "./FoodCard";

function UserDashboard() {
  useGetShopByCity(); // fetch shops safely

  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(true);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const { currentCity, shopInMyCity, itemsInMyCity } = useSelector(state => state.user);

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

    // initial check
    handleScroll();

    return () => {
      if (cateEl) cateEl.removeEventListener("scroll", handleScroll);
      if (shopEl) shopEl.removeEventListener("scroll", handleScroll);
    };
  }, [catgories]);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Nav />

      {/* Categories Section */}
      <div className="w-full max-w-6xl flex flex-col gap-5 p-[10px] items-start">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">Inspiration for your first order</h1>
        <div className="w-full relative">
          {showLeftCateButton && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#fff9f6] rounded-full text-white p-2 z-10 hover:bg-[#ff4d2d] shadow-lg"
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaChevronCircleLeft size={30} className="text-[#ff4d2d]" />
            </button>
          )}
          <div className="w-full flex gap-4 overflow-x-auto pb-3" ref={cateScrollRef}>
            {catgories.map((cate, index) => (
              <CategoryCard key={index} name={cate.category} image={cate.image} />
            ))}
          </div>
          {showRightCateButton && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#fff9f6] rounded-full text-white p-2 z-10 hover:bg-[#ff4d2d] shadow-lg"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaChevronCircleRight size={30} className="text-[#ff4d2d]" />
            </button>
          )}
        </div>
      </div>

      {/* Shops Section */}
      <div className="w-full max-w-6xl flex flex-col gap-5 p-[10px] items-start">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">Best Shop in {currentCity || "your city"}</h1>
        <div className="w-full relative">
          {showLeftShopButton && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#fff9f6] rounded-full text-white p-2 z-10 hover:bg-[#ff4d2d] shadow-lg"
              onClick={() => scrollHandler(shopScrollRef, "left")}
            >
              <FaChevronCircleLeft size={30} className="text-[#ff4d2d]" />
            </button>
          )}
          <div className="w-full flex gap-4 overflow-x-auto pb-3" ref={shopScrollRef}>
            {shopInMyCity?.length > 0 ? (
              shopInMyCity.map((shop, index) => (
                <CategoryCard key={index} image={shop.image} name={shop.name} />
              ))
            ) : (
              <p className="text-gray-500">No shops found in this city.</p>
            )}
          </div>
          {showRightShopButton && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#fff9f6] rounded-full text-white p-2 z-10 hover:bg-[#ff4d2d] shadow-lg"
              onClick={() => scrollHandler(shopScrollRef, "right")}
            >
              <FaChevronCircleRight size={30} className="text-[#ff4d2d]" />
            </button>
          )}
        </div>
      </div>
      {/*Products*/}

      <div className="w-full max-w-6xl flex flex-col gap-5 p-[10px] items-start">
          <h1 className="text-gray-800 text-2xl sm:text-3xl">Suggested Food items </h1>
          <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center ">
          {itemsInMyCity?.map((item,index)=>{
            <FoodCard key={index} data={item} />
          })}
          </div>
      </div>
    </div>
  );
}

export default UserDashboard;
