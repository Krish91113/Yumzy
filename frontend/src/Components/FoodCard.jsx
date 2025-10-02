import React, { useState } from "react";
import { FaDrumstickBite } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/userSlice";

function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-amber-400 text-sm drop-shadow-sm" />
        ) : (
          <FiStar key={i} className="text-amber-400 text-sm drop-shadow-sm" />
        )
      );
    }
    return stars;
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(
        addToCart({
          id: data._id, // keep consistent
          name: data.name,
          price: data.price,
          image: data.image,
          shop: data.shop,
          quantity,
          foodType: data.foodType
        })
      );
    }
  };

  const alreadyInCart = cartItems.some((i) => i.id === data._id);

  return (
    <div className="group w-[280px] rounded-3xl bg-gradient-to-b from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden border border-gray-100 hover:border-[#ff4d2d]/30 hover:-translate-y-2">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d2d]/5 via-transparent to-[#ff4d2d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Image Container */}
      <div className="relative w-full h-[190px] overflow-hidden bg-gradient-to-b from-gray-50 to-white rounded-t-3xl">
        {/* Food Type Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-2.5 shadow-lg z-10 transform transition-transform duration-300 hover:scale-110">
          {data.foodType === "Veg" ? (
            <FaLeaf className="text-green-500 text-xl drop-shadow-sm" />
          ) : (
            <FaDrumstickBite className="text-red-500 text-xl drop-shadow-sm" />
          )}
        </div>

        <div className="absolute top-4 left-4 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4d] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
          POPULAR
        </div>

        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col p-5 relative">
        <h1 className="font-bold text-gray-800 text-lg leading-tight mb-2 line-clamp-2 group-hover:text-[#ff4d2d] transition-colors duration-300">
          {data.name}
        </h1>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {renderStars(data.rating?.average || 0)}
          </div>
          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
            {data.rating?.average || 0} ({data.rating?.count || 0})
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between p-5 pt-0 mt-auto">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Price</span>
          <span className="font-bold text-2xl text-gray-900 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4d] bg-clip-text text-transparent">
            {data.price}
          </span>
        </div>

        <div className="flex items-center bg-white border-2 border-gray-200 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
          <button
            className="px-3 py-2 hover:bg-gray-100 transition-all duration-200 active:scale-95 disabled:opacity-50"
            onClick={handleDecrease}
            disabled={quantity === 0}
          >
            <FaMinus size={14} className="text-gray-600" />
          </button>

          <span className="px-4 font-semibold text-gray-800 min-w-[40px] text-center bg-gray-50">
            {quantity}
          </span>

          <button
            className="px-3 py-2 hover:bg-gray-100 transition-all duration-200 active:scale-95"
            onClick={handleIncrease}
          >
            <FaPlus size={14} className="text-gray-600" />
          </button>

          <button
            className={`text-white px-4 py-2.5 transition-all duration-300 active:scale-95 flex items-center gap-2 ${
              alreadyInCart
                ? "bg-gray-900"
                : "bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4d] hover:from-[#ff6b4d] hover:to-[#ff4d2d]"
            }`}
            onClick={handleAddToCart}
          >
            <FaShoppingCart size={16} />
            {quantity > 0 && (
              <span className="bg-white text-[#ff4d2d] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {quantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
