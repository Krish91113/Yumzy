import mongoose from "mongoose";

const itemSchema =new mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop",
    },
    category:{
        type:String,
        enum:["Snacks",
            "Main Course",
            "Desserts",
            "Pizza",
            "Burger",
            "Sandwiches",
            "South India",
            "North Indian",
            "Chinese",
            "Italian",
            "Fast Food",
            "Street Food",
            "Others"
        ],
        required:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    foodtype:{
        type:String,
        enum:["Veg","Non Veg"],
        required:true
    }
},{timestamps:true})

const Item=mongoose.model("Item",itemSchema)
export default Item