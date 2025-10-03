import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserOrderCard from "../Components/UserOrderCard";
import OwnerOrderCard from "../Components/OwnerOrderCard";
import axios from "axios";
import { setMyOrders } from "../redux/userSlice";
import { serverUrl } from "../App";

function MyOrder() {
  const { userData, myOrders } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/order/my-orders`, {
          withCredentials: true,
        });
        dispatch(setMyOrders(res.data));
      } catch (error) {
        console.error("Fetch orders error:", error);
      }
    };
    fetchOrders();
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex justify-center px-4">
      <div className="w-full max-w-[800px] p-4">
        {/* Back button */}
        <div className="flex items-center gap-[20px] mb-6">
          <div className="z-[10]" onClick={() => navigate("/")}>
            <IoIosArrowRoundBack size={36} className="text-[#ff4d2d]" />
          </div>
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>

        <div className="space-y-6">
          {myOrders && myOrders.length > 0 ? (
            myOrders.map((order, index) =>
              userData?.role === "user" ? (
                <UserOrderCard data={order} key={index} />
              ) : userData?.role === "owner" ? (
                <OwnerOrderCard data={order} key={index} />
              ) : null
            )
          ) : (
            <p className="text-center text-gray-500 py-6">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
