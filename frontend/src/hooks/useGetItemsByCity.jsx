import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItemsInMyCity } from "../redux/userSlice";
import { serverUrl } from "../App";

function useGetItemsByCity() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector(state => state.user);

  useEffect(() => {
    if (!currentCity) return;

    const fetchItems = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-by-city/${currentCity}`,
          { withCredentials: true }
        );
        dispatch(setItemsInMyCity(result.data));
        console.log("Items fetched:", result.data);
      } catch (error) {
        console.error("Error fetching items:", error.response?.data || error.message);
        dispatch(setItemsInMyCity([]));
      }
    };

    fetchItems();
  }, [currentCity, dispatch]);
}

export default useGetItemsByCity;
