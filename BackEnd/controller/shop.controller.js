import Shop from "../models/shop.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;

    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });
    } else {
     shop = await Shop.findByIdAndUpdate(shop._id, {
        name,
        city,
        state,
        address,
        image: image || shop.image,
        owner: req.userId,
      }, { new: true });
    }

    await shop.populate("owner items");
    return res.status(201).json(shop);
  } catch (error) {
    console.error("create shop error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate("owner items");
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    return res.status(200).json(shop);
  } catch (error) {
    console.error("get my shop error:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const getShopByCity = async (req, res) => {
  try {
    const { city } = req.params;
    console.log("Searching shops in:", city);

    const shops = await Shop.find({
      city: { $regex: `^${city}$`, $options: "i" } // case-insensitive exact match
    }).populate("items")

    if (!shops || shops.length === 0) {
      return res.status(404).json({ message: "No shops found in this city" });
    }

    res.status(200).json(shops);
  } catch (error) {
    console.error("Error fetching shops:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
