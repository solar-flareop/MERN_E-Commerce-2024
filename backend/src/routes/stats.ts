import express from "express";
import { isAdmin } from "../middleware/auth.js";
import {
  getBarCharts,
  getDashboardStats,
  getLineCharts,
  getPieCharts,
} from "../controllers/stats.js";

const app = express.Router();

// route - /api/v1/dashboard/stats
app.get("/stats", isAdmin, getDashboardStats);

// route - /api/v1/dashboard/pie
app.get("/pie", isAdmin, getPieCharts);

// route - /api/v1/dashboard/bar
app.get("/bar", isAdmin, getBarCharts);

// route - /api/v1/dashboard/line
app.get("/line", isAdmin, getLineCharts);

export default app;
