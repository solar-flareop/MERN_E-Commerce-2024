import express from "express";
import { isAdmin } from "../middleware/auth.js";
import {
  allCoupons,
  applyDiscount,
  deleteCoupon,
  newCoupon,
  createPaymentIntentHandler,
} from "../controllers/payment.js";

const app = express.Router();

// route - /api/v1/payment/coupon/new
app.get("/discount", applyDiscount);

// route - /api/v1/payment/coupon/new
app.post("/coupon/new", isAdmin, newCoupon);

// route - /api/v1/payment/coupon/all
app.get("/coupon/all", isAdmin, allCoupons);

// route - /api/v1/payment/coupon/:id
app.delete("/coupon/:id", isAdmin, deleteCoupon);

// route - /api/v1/payment/create
app.post("/create", createPaymentIntentHandler);

export default app;
