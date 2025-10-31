import axios from "axios";
import React from "react";
import { IoIosCall } from "react-icons/io";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../redux/userSlice";

function OwnerOrderCard({ data }) {
  // const dispatch = useDispatch();

  // IMPROVED Frontend Function
const handleUpdateStatus = async (orderId, shopId, status) => {
  try {
    console.log("=== FRONTEND UPDATE REQUEST ===");
    console.log("OrderId:", orderId, "Type:", typeof orderId);
    console.log("ShopId:", shopId, "Type:", typeof shopId);
    console.log("Status:", status);
    console.log("URL:", `${serverUrl}/api/order/update-status/${orderId}/${shopId}`);

    const result = await axios.post(
      `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
      { status },
      { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    console.log("Success Response:", result.data);
    
    // Add success feedback
    toast.success("Order status updated successfully");
    
    // Refresh data or update state
    // fetchOrders(); // or update local state
    
    return result.data;

  } catch (error) {
    console.error("=== UPDATE STATUS ERROR ===");
    console.error("Full error:", error);
    console.error("Response data:", error.response?.data);
    console.error("Response status:", error.response?.status);
    console.error("Response headers:", error.response?.headers);
    
    // Add user feedback
    toast.error(error.response?.data?.message || "Failed to update status");
    
    throw error;
  }
};


  

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-6">
      {/* User Info */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{data.user?.fullName}</h2>
        <p className="text-sm text-gray-500">{data.user?.email}</p>
        <p className="flex items-center gap-2 text-sm text-gray-800 mt-1">
          <IoIosCall />
          <span>{data.user?.mobile}</span>
        </p>
      </div>

      {/* Delivery Address */}
      <div className="flex items-start gap-2 flex-col text-gray-800 text-sm">
        <p>{data?.deliveryAddress?.text}</p>
        <p className="text-xs text-gray-500">
          Lat : {data?.deliveryAddress?.latitude}, Lon : {data?.deliveryAddress?.longitude}
        </p>
      </div>

      {/* Loop over shop orders */}
      {data.shopOrders?.shopOrderItems?.map((shopOrder) => (
  <div key={shopOrder._id} className="border rounded-lg p-4 bg-gray-50 space-y-4">
    {/* Items */}
    <div className="flex gap-3 flex-wrap">
      {shopOrder?.shopOrderItems?.map((item, index) => (
        <div key={index} className="flex-shrink-0 w-40 border rounded-lg p-2 bg-white">
          <img src={item.item?.image} alt={item.item?.name} className="w-full h-24 object-cover rounded" />
          <p className="font-medium">{item.item?.name}</p>
          <p className="text-sm text-gray-600">{item.quantity} x ₹{item.price}</p>
        </div>
      ))}
    </div>

    {/* Status */}
    <div className="flex justify-between items-center mt-auto p-3 border-t border-gray-200">
      <span>
        Status: <span className="font-semibold capitalize text-[#ff4d2d]">{shopOrder.status}</span>
      </span>

      <select
        className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-[#ff4d2d] text-[#ff4d2d]"
        value={shopOrder.status}
        onChange={(e) =>
          handleUpdateStatus(data._id, shopOrder.shop, e.target.value) // <--- correct
        }
      >
        <option value="pending">Pending</option>
        <option value="preparing">Preparing</option>
        <option value="out of delivery">Out of delivery</option>
        <option value="delivered">Delivered</option>
      </select>
    </div>

    {/* Subtotal */}
    <div className="text-right font-bold text-gray-800 text-sm">
      Subtotal: ₹{shopOrder.subtotal}
    </div>
  </div>
))}

      {/* Total */}
      <div className="text-right font-bold text-lg text-gray-900">
        Total : ₹{data?.totalAmount}
      </div>
    </div>
  );
}

export default OwnerOrderCard;
