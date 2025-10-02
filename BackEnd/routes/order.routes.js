import express from "express";
import {  getMyOrders, placeOrder } from "../controller/order.controller.js";
import isAuth from "../middlewares/isAuth.js";

const orderRouter = express.Router();

// ✅ use correct controller
orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/my-orders", isAuth, getMyOrders);

export default orderRouter;
