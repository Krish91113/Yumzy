import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../redux/userSlice";

function CartItemCard({ data }) {
  const dispatch = useDispatch();

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="group flex items-center justify-between bg-white bg-opacity-95 backdrop-blur-sm p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 relative overflow-hidden">
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Left section with image and details */}
      <div className="flex items-center gap-5 relative z-10">
        {/* Product image with enhanced styling */}
        <div className="relative">
          <img
            src={data.image}
            alt={data.name}
            className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200 shadow-md group-hover:scale-105 transition-transform duration-300"
          />
          {/* Quantity badge on image */}
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
            {data.quantity}
          </div>
        </div>
        
        {/* Product details with enhanced typography */}
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
            {data.name}
          </h1>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span className="text-gray-400">Unit Price:</span>
            <span className="font-medium">₹{data.price}</span>
            <span className="text-gray-400">×</span>
            <span className="font-medium">{data.quantity}</span>
          </p>
          <p className="font-bold text-xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>

      {/* Right section with quantity controls */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Quantity control container with glass effect */}
        <div className="flex items-center bg-gray-50 rounded-full p-1 shadow-inner border border-gray-200">
          {/* Decrease button */}
          <button
            className="p-2 bg-white rounded-full hover:bg-orange-100 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleDecrease(data._id, data.quantity)}
            disabled={data.quantity <= 1}
          >
            <FaMinus size={12} className="text-gray-600 hover:text-orange-600" />
          </button>
          
          {/* Quantity display */}
          <span className="px-4 font-bold text-gray-800 min-w-[50px] text-center">
            {data.quantity}
          </span>
          
          {/* Increase button */}
          <button
            className="p-2 bg-white rounded-full hover:bg-orange-100 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
            onClick={() => handleIncrease(data._id, data.quantity)}
          >
            <FaPlus size={12} className="text-gray-600 hover:text-orange-600" />
          </button>
        </div>
        
        {/* Separator line */}
        <div className="h-8 w-px bg-gray-300"></div>
        
        {/* Remove button with enhanced styling */}
        <button
          className="p-3 bg-red-100 rounded-full text-red-600 hover:bg-red-200 hover:text-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 hover:rotate-12"
          onClick={() => handleRemove(data._id)}
        >
          <CiTrash size={20} className="font-bold" />
        </button>
      </div>
    </div>
  );
}

export default CartItemCard;