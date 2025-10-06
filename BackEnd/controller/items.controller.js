// items.controller.js
import Item from "../models/item.models.js";
import Shop from "../models/shop.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// ========================== ADD ITEM ==========================
export const addItem = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;

    // Ensure the shop exists
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found. Create your shop first." });
    }

    // Upload image if provided
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const newItem = await Item.create({
      name,
      category,
      foodType, // must be "Veg" or "Non Veg"
      price,
      image,
      shop: shop._id
    });

    // Optionally push the item to shop's items array
    shop.items.push(newItem._id);
    await shop.save();

    return res.status(201).json(newItem);
  } catch (error) {
    console.error("Add item error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ========================== DELETE ITEM ==========================
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the item first
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the item belongs to the user's shop
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop || item.shop.toString() !== shop._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    // Remove item from shop's items array
    shop.items = shop.items.filter(itemId => itemId.toString() !== id);
    await shop.save();

    // Delete the item
    await Item.findByIdAndDelete(id);

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Delete item error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ========================== EDIT ITEM ==========================
export const editItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, foodType, price } = req.body;

    // Find the item
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the item belongs to the user's shop
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop || item.shop.toString() !== shop._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this item" });
    }

    // Upload new image if provided
    let image = item.image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    // Update the item
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        name: name || item.name,
        category: category || item.category,
        foodType: foodType || item.foodType,
        price: price || item.price,
        image
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Edit item error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ========================== GET ITEM BY ID ==========================
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id).populate('shop');
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json(item);
  } catch (error) {
    console.error("Get item by ID error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ========================== GET ITEMS BY SHOP ==========================
export const getItemsByShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate({
      path: "items",
      options: { sort: { updatedAt: -1 } },
    });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.status(200).json(shop.items);
  } catch (error) {
    console.error("Get items error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ========================== GET ITEMS BY CITY ==========================
export const getItemsByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const shops = await Shop.find({ city: { $regex: new RegExp(`^${city}$`, "i") } }).populate("items");
    if (!shops || shops.length === 0) {
      return res.status(404).json({ message: "No shops/items found in this city" });
    }

    // Merge items from all shops
    const items = shops.flatMap(shop => shop.items);
    return res.status(200).json(items);
  } catch (error) {
    console.error("Get items by city error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Alternative name if you want to use getItemByCity instead of getItemsByCity
export const getItemByCity = getItemsByCity;