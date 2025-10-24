import express from "express";
import {  getMyOrders, placeOrder, updateShopOrderStatus } from "../controller/order.controller.js";
import isAuth from "../middlewares/isAuth.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/my-orders", isAuth, getMyOrders);

orderRouter.post("/update-status/:orderId/:shopId", isAuth, updateShopOrderStatus);

export default orderRouter;