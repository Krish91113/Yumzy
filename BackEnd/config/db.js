import mongoose from "mongoose";


const connectDb = async () => {
    try {
        console.log("Mongo URI:", process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to the database", error.message);
    }
}

export default connectDb;   