import express from "express";
const app = express.Router();
import {
  deleteUser,
  getAllUsers,
  getUserById,
  newUserHandler,
} from "../controllers/user.js";
import { isAdmin } from "../middleware/auth.js";

//create new user - /api/v1/user/new
app.post("/new", newUserHandler);

//get all users - /api/v1/user/all
app.get("/all", isAdmin, getAllUsers);

//get & delete user - /api/v1/user/:id
app.route("/:id").get(getUserById).delete(isAdmin, deleteUser);

export default app;
