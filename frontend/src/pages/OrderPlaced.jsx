import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex flex-col justify-center items-center px-6 text-center relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      {/* Success Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-40"></div>
        <FaCircleCheck className="relative text-green-600 text-8xl drop-shadow-xl" />
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
        Order Placed!
      </h1>

      {/* Message */}
      <p className="text-gray-700 max-w-lg mb-8 leading-relaxed text-lg md:text-xl">
        🎉 Thank you for your purchase! <br />
        Your order is being prepared. You can track your order status in the{" "}
        <span className="font-semibold text-orange-600">My Orders</span> section.
      </p>

      {/* Button */}
      <button className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95" onClick={()=>navigate("/my-orders")}>
        Back to My Orders
      </button>
    </div>
  );
}

export default OrderPlaced;
