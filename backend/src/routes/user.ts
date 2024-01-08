import express from "express";
const app = express.Router();
import {
  deleteUser,
  getAllUsers,
  getUserById,
  newUserHandler,
} from "../controllers/user.js";

app.post("/new", newUserHandler);
app.get("/all", getAllUsers);
app.route("/:id").get(getUserById).delete(deleteUser);

export default app;
