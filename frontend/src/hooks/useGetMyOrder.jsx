import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setMyOrders } from "../redux/userSlice";
import { serverUrl } from "../App";

function useGetMyOrders() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector(state => state.user);
  const { userData } = useSelector(state => state.user);
  useEffect(() => {
    
    if (!currentCity) return;
    
    const fetchOrders = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/order/my-orders`,
          { withCredentials: true }
        );
        dispatch(setMyOrders(result.data));
        console.log("Orders fetched:", result.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        dispatch(setMyOrders([]));
      }
    };

    fetchOrders();
  }, [userData]);
}

export default useGetMyOrders;