import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middleware/error.js";
import NodeCache from "node-cache";
const app = express();

//imports
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";

connectDB();
export const myCache = new NodeCache();

//middlewares
app.use(express.json());

//default Route
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<h1>Welcome to MERN_ECOMMERCE_2024 Server🚀. Click here to visit website </h1>`
    );
});

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

//custom middleware
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
