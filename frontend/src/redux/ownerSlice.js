import { createSlice } from "@reduxjs/toolkit";

const savedShopData = localStorage.getItem("myShopData");

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    myShopData: savedShopData ? JSON.parse(savedShopData) : null,
  },
  reducers: {
    setMyShopData: (state, action) => {
      state.myShopData = action.payload;
      localStorage.setItem("myShopData", JSON.stringify(action.payload));
    },
    clearMyShopData: (state) => {
      state.myShopData = null;
      localStorage.removeItem("myShopData");
    },
  },
});

export const { setMyShopData, clearMyShopData } = ownerSlice.actions;
export default ownerSlice.reducer;
