import Shop from "../models/shop.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import path from "path";

export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;

    if (req.file) {
      console.log("File received:", req.file);
      image = await uploadOnCloudinary(path.resolve(req.file.path));
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
      const updateData = { name, city, state, address, owner: req.userId };
      if (image) updateData.image = image;

      shop = await Shop.findByIdAndUpdate(shop._id, updateData, { new: true });
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
    const shop = await Shop.findOne({ owner: req.userId }).populate(
      {
      path: "items",
      options: { sort: { updatedAt: -1 } },
    }
    );
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    return res.status(200).json(shop);
  } catch (error) {
    console.error("get my shop error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getShopByCity =async (req,res)=>{
  try {
    const { city } = req.params;
    const shops = await Shop.find({
       city : { $regex: new RegExp(`^${city}$`, 'i') }
       }).populate('items');
       if(!shops){
        return res.status(404).json({message:"No shop found in this city"})
       }
       return res.status(200).json(shops);
  } catch (error) {
    console.error("get shop by city error:", error);
    return res.status(500).json({ message: error.message });
  }
}