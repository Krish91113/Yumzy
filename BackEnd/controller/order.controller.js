import Order from "../models/order.model.js";
import Shop from "../models/shop.models.js";
import User from "../models/usermodel.js";

export const placeOrder = async (req, res) => {
  try {
    const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (
      !deliveryAddress?.text ||
      !deliveryAddress?.latitude ||
      !deliveryAddress?.longitude
    ) {
      return res.status(400).json({ message: "Delivery Address is missing" });
    }

    const groupItemsByShop = {};

    // ✅ Fix bug: initialize only if not exists
    cartItems.forEach((item) => {
      const shopId = item.shop;
      if (!groupItemsByShop[shopId]) {
        groupItemsByShop[shopId] = [];
      }
      groupItemsByShop[shopId].push(item);
    });

    const shopOrders = await Promise.all(
      Object.keys(groupItemsByShop).map(async (shopId) => {
        const shop = await Shop.findById(shopId).populate("owner");
        if (!shop) {
          return res.status(400).json({ message: "Shop not found" });
        }

        const items = groupItemsByShop[shopId];
        const subtotal = items.reduce(
          (sum, i) => sum + Number(i.price) * Number(i.quantity),
          0
        );

        return {
          shop: shop._id,
          owner: shop.owner._id,
          subtotal,
          shopOrderItems: items.map((i) => ({
            item: i._id,
            price: i.price,
            quantity: i.quantity,
            name: i.name,
          })),
        };
      })
    );

    const newOrder = await Order.create({
      user: req.userId,
      paymentMethod,
      deliveryAddress,
      totalAmount,
      shopOrders,
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Place order error:", error);
    return res
      .status(500)
      .json({ message: `place order error ${error.message}` });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    let query = {};
    if (user.role === "user") {
      query = { user: req.userId };
    } else if (user.role === "owner") {
      query = { "shopOrders.owner": req.userId };
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate({
        path: "shopOrders.shop",
        select: "name address"
      })
      .populate({
        path: "shopOrders.owner",
        select: "name email mobile"
      })
      .populate({
        path: "shopOrders.shopOrderItems.item",
        select: "name image price"
      })
      .populate({
        path: "user",
        select: "fullName email mobile"
      });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Get my orders error:", error);
    return res.status(500).json({ message: `get my order error ${error.message}` });
  }
};

