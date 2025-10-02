import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shop.route.js";
import itemRouter from "./routes/item.routes.js";

const app = express();
const port = process.env.PORT || 5000;

// ✅ Allow frontend CORS (update if your frontend runs on different port)
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);

// ✅ Start server after DB connects
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
