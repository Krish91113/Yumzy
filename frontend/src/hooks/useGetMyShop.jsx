import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function useGetMyShop(){
    const dispatch=useDispatch()
    useEffect(() =>{
        const fetchShop = async () =>{
            try{

                const result =await axios.get(`${serverUrl}/api/shop/get-my`, {withCredentials:true})
                dispatch(setMyShopData(result.data))
            }catch(error){

            }
        }
        fetchShop()
    },[])
}



export default useGetMyShop