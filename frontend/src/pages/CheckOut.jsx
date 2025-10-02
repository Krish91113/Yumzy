import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
function CheckOut() {
  return (
    <div className="min-h-screen bg-[#fff9f6] flex items-center p-6 justify-center">
      <div
        className="absolute top-[20px] left-[20px] z-[10] "
        onClick={() => navigate("/")}>
        <IoIosArrowRoundBack
          size={35}
          className="text-orange-600 hover:text-red-600 transition-colors"
        />

      </div>
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
            <section>
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800 "><FaLocationDot className="text-[#ff4d2d]"/>Delivery Location</h2>
                <div className="flex gap-2 mb-3">
                    <input className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]" type="text" />
                    <button className="bg-[#ff4d2d] hover:bg-[#ff4d2d] text-white px-3 y-2 rounded-lg flec items-center justify-center"><FaSearch size={18}/></button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 y-2 rounded-lg flec items-center justify-center"><BiCurrentLocation size={18} /></button>
                </div>
            </section>
      </div>
    </div>
  );
}

export default CheckOut;
