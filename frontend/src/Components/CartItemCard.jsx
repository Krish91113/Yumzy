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
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-boder">
      <div className="flex items-center gap-4">
        <img
          src={data.image}
          alt={data.name}
          className="w-20 h-20 object-cover rounded-lg border"
        />
        <div>
          <h1 className="font-bold text-gray-600">{data.name}</h1>
          <p className="text-sm text-gray-600">
            ₹ {data.price} x {data.quantity}
          </p>
          <p className="font-bold text-gray-900">₹{data.price * data.quantity}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          onClick={() => handleDecrease(data._id, data.quantity)}
        >
          <FaMinus size={12} />
        </button>
        <span className="px-2">{data.quantity}</span>
        <button
          className="px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          onClick={() => handleIncrease(data._id, data.quantity)}
        >
          <FaPlus size={12} />
        </button>
        <button
          className="p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
          onClick={() => handleRemove(data._id)}
        >
          <CiTrash size={18} />
        </button>
      </div>
    </div>
  );
}

export default CartItemCard;
