import express from "express";
import {  getMyOrders, placeOrder, updateShopOrderStatus } from "../controller/order.controller.js";
import isAuth from "../middlewares/isAuth.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/my-orders", isAuth, getMyOrders);

orderRouter.put("/update-status/:orderId/:shopOrderId", isAuth, updateShopOrderStatus);

export default orderRouter;