import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middleware/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
const app = express();

//imports
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import orderRouter from "./routes/order.js";

config({ path: "./.env" });
connectDB(process.env.MONGO_URI!);
export const myCache = new NodeCache();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//default Route
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<h1>Welcome to MERN_ECOMMERCE_2024 Server🚀. Click <a href=${process.env.FRONTEND_URL}>here</a> to visit website </h1>`
    );
});

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);

//custom middleware
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
