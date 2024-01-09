import express from "express";
import { isAdmin } from "../middleware/auth.js";
import {
  allOrders,
  deleteOrder,
  getSingleOrder,
  myOrders,
  newOrder,
  processOrder,
} from "../controllers/order.js";

const app = express.Router();

// create new order - /api/v1/order/new
app.post("/new", newOrder);

// get user specific orders - /api/v1/order/my
app.get("/my", myOrders);

// all orders - /api/v1/order/my
app.get("/all", isAdmin, allOrders);

app
  .route("/:id")
  .get(getSingleOrder)
  .put(isAdmin, processOrder)
  .delete(isAdmin, deleteOrder);

export default app;
