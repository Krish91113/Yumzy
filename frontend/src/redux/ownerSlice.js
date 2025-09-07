import { createSlice } from "@reduxjs/toolkit";

const ownerSlice=createSlice({
    name: "owner",
    initialState:{
        MyShopData : null
    },
    reducers:{
        setMyShopData:(state,action) =>{
            state.MyShopData=action.payload
        },
    }
})

export const{setMyShopData}=ownerSlice.actions
export default ownerSlice.reducer

