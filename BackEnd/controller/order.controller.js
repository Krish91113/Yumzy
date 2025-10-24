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
    cartItems.forEach((item) => {
      const shopId = item.shop;
      if (!shopId || shopId === "null") return; // ✅ skip invalid shop IDs
      if (!groupItemsByShop[shopId]) {
        groupItemsByShop[shopId] = [];
      }
      groupItemsByShop[shopId].push(item);
    });

    // // ✅ if no valid shop IDs exist
    // if (Object.keys(groupItemsByShop).length === 0) {
    //   return res.status(400).json({ message: "Invalid or missing shop IDs in cart items" });
    // }

    const shopOrders = await Promise.all(
      Object.keys(groupItemsByShop).map(async (shopId) => {
        const shop = await Shop.findById(shopId).populate("owner");
        if (!shop) throw new Error(`Shop not found for ID ${shopId}`);

        const items = groupItemsByShop[shopId];
        const subtotal = items.reduce(
          (sum, i) => sum + Number(i.price) * Number(i.quantity),
          0
        );

        return {
          shop: shop._id,
          owner: shop.owner?._id,
          subtotal,
          status: "pending",
          shopOrderItems: items.map((i) => ({
            item: i.id,
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

    // await newOrder.populate("shopOrders.shopOrderItems.item", "name image price");
    // await newOrder.populate("shopOrders.shop", "name");

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
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    if(user.role == "user"){
        const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .populate("shopOrders.shop", "name" )
      .populate("shopOrders.owner", "name email mobile" )
      .populate("shopOrders.shopOrderItems.item", "name image price" )

    return res.status(200).json(orders);
    } else if(user.role == "owner"){
      const orders = await Order.find({ "shopOrders.owner": req.userId })
      .sort({ createdAt: -1 })
      .populate("shopOrders.shop", "name" )
      .populate("user")
      .populate("shopOrders.shopOrderItems.item", "name image price" )

    return res.status(200).json(orders);
    }
  } catch (error) {
    console.error("Get my orders error:", error);
    return res
      .status(500)
      .json({ message: `get my order error ${error.message}` });
  }
};

  

export const updateShopOrderStatus = async (req, res) => {
  try {
    const { orderId, shopId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const shopOrder = order.shopOrders.find(
      (o) => o.shop.toString() === shopId.toString()
    );
    if (!shopOrder) {
      return res.status(400).json({ message: "Shop order not found" });
    }

    shopOrder.status = status;
    await order.save();

    return res.status(200).json({ success: true, status: shopOrder.status });
  } catch (error) {
    console.error("Update order status error:", error);
    return res
      .status(500)
      .json({ message: `update order status error ${error.message}` });
  }
};
