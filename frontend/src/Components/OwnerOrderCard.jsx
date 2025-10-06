import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { IoIosCall } from "react-icons/io";
import { serverUrl } from "../App";
import { updateOrderStatus } from "../redux/userSlice";

function OwnerOrderCard({ data }) {
  const dispatch = useDispatch();

  const handleUpdateStatus = async (orderId, shopOrderId, status) => {
    try {
      const res = await axios.put(
        `${serverUrl}/api/order/update-status/${orderId}/${shopOrderId}`,
        { status },
        { withCredentials: true }
      );

      dispatch(updateOrderStatus({ orderId, shopOrderId, status }));
      console.log("Status updated:", res.data);
    } catch (error) {
      console.error("Update status error:", error);
    }
  };

  const shopOrders = Array.isArray(data?.shopOrders) ? data.shopOrders : [];

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-6">
      {/* User info */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{data.user?.fullName}</h2>
        <p className="text-sm text-gray-500">{data.user?.email}</p>
        <p className="flex items-center gap-2 text-sm text-gray-800 mt-1">
          <IoIosCall />
          <span>{data.user?.mobile}</span>
        </p>
      </div>

      {/* Delivery address */}
      <div className="flex flex-col text-gray-800 text-sm">
        <p>{data?.deliveryAddress?.text}</p>
        <p className="text-xs text-gray-500">
          Lat: {data?.deliveryAddress?.latitude}, Lon: {data?.deliveryAddress?.longitude}
        </p>
      </div>

      {/* Shop orders */}
      {shopOrders.map((shopOrder) => (
        <div key={shopOrder._id} className="border rounded-lg p-4 bg-gray-50 space-y-4">
          <div className="flex gap-3 flex-wrap">
            {shopOrder.shopOrderItems?.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-40 border rounded-lg p-2 bg-white">
                <img src={item.item?.image} alt={item.name} className="w-full h-24 object-cover rounded"/>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.quantity} x ₹{item.price}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-auto p-3 border-t border-gray-200">
            <span>
              Status: <span className="font-semibold capitalize text-[#ff4d2d]">{shopOrder.status}</span>
            </span>

            <select
              className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-[#ff4d2d] text-[#ff4d2d]"
              value={shopOrder.status}
              onChange={(e) => handleUpdateStatus(data._id, shopOrder._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="out of delivery">Out of delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          <div className="text-right font-bold text-gray-800 text-sm">
            Subtotal: ₹{shopOrder.subtotal}
          </div>
        </div>
      ))}

      <div className="text-right font-bold text-lg text-gray-900">Total: ₹{data?.totalAmount}</div>
    </div>
  );
}

export default OwnerOrderCard;