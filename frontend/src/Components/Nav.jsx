import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { serverUrl } from "../App";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { TbReceiptRupee } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { userData, currentCity, cartItems } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/signout`,
        {},
        { withCredentials: true }
      );
      dispatch(setUserData(null));
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-between lg:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      
      {/* Mobile search dropdown */}
      {showSearch && userData?.role === "user" && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%] md:hidden">
          {/* Location */}
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={20} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
          </div>
          {/* Search */}
          <div className="w-[80%] flex items-center gap-[10px]">
            <FaSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food"
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}

      {/* Logo */}
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">YumzY</h1>

      {/* Desktop: location + search bar */}
      {userData?.role === "user" && (
        <div className="hidden md:flex items-center gap-[15px] px-[15px] py-[8px] border rounded-lg bg-white shadow-sm w-[450px]">
          {/* Location */}
          <FaLocationDot size={20} className="text-[#ff4d2d]" />
          <div className="truncate text-gray-600 w-[80px]">{currentCity}</div>
          <span className="h-[20px] w-[1px] bg-gray-400 mx-[10px]"></span>
          {/* Search */}
          <FaSearch size={20} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search delicious food"
            className="px-[10px] text-gray-700 outline-0 w-full"
          />
        </div>
      )}

      {/* Right side icons */}
      <div className="flex items-center gap-4">
        
        {/* Mobile: search toggle */}
        {userData?.role === "user" &&
          (showSearch ? (
            <RxCross2
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <FaSearch
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(true)}
            />
          ))}

        {/* Owner add item */}
        {userData?.role === "owner" ? (
          <>
            {myShopData && (
              <>
                <button
                  className="hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]"
                  onClick={() => navigate("/add-item")}
                >
                  <FaPlus size={20} />
                  <span>Add Food item </span>
                </button>
                <button
                  onClick={() => navigate("/add-item")}
                  className="md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]"
                >
                  <FaPlus size={20} />
                </button>
              </>
            )}
          </>
        ) : (
          <>
            {/* Cart */}
            {userData?.role === "user" && (
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <FaShoppingCart size={25} className="text-[#ff4d2d]" />
                <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
                  {cartItems.length}
                </span>
              </div>
            )}

            {/* Orders button (desktop only) */}
            {userData?.role === "user" && (
              <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
                My Orders
              </button>
            )}
          </>
        )}

        {/* Profile circle */}
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullName?.slice(0, 1)}
        </div>

        {/* Dropdown menu */}
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">
              {userData?.fullName}
            </div>
            {userData?.role === "user" && (
              <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
                My Orders
              </div>
            )}
            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogOut}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
