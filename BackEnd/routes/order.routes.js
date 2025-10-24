import express from "express";
import {  getOwnerOrders, getUserOrders, placeOrder, updateShopOrderStatus } from "../controller/order.controller.js";
import isAuth from "../middlewares/isAuth.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/user-orders", isAuth, getUserOrders);
orderRouter.get("/owner-orders", isAuth, getOwnerOrders);
orderRouter.put("/update-status/:orderId/:shopOrderId", isAuth, updateShopOrderStatus);

export default orderRouter;