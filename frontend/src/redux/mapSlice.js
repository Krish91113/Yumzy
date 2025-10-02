import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "user",
  initialState: {
    location:{
      lat:null,
      lon:null
    },
    adress:null,
  },
  reducers: {
    setLocation:(state,action)=>{
      const {lat,lon}=action.payload
      state.location.lat=lat
      state.location.lon=lon
    },
    setAdress:(state,action)=>{
      state.adress=state.payload
    }
  }
});

export const {
  setAdress, setLocation
} = mapSlice.actions;

export default mapSlice.reducer;
