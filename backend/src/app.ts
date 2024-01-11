import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middleware/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";

//imports
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import orderRouter from "./routes/order.js";
import paymentRouter from "./routes/payment.js";
import dashboardRouter from "./routes/stats.js";

const app = express();
config({ path: "./.env" });
connectDB(process.env.MONGO_URI!);
export const myCache = new NodeCache();
export const stripe = new Stripe(process.env.STRIPE_KEY!);

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//default route
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
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/dashboard", dashboardRouter);

//custom middleware
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
