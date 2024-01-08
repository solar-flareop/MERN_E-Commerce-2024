import express from "express";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getSingleProduct,
  getlatestProducts,
  newProduct,
  updateProduct,
} from "../controllers/product.js";
import { multerSingleUpload } from "../middleware/multer.js";
import { isAdmin } from "../middleware/auth.js";

const app = express.Router();

//create new nroduct - /api/v1/product/new
app.post("/new", isAdmin, multerSingleUpload, newProduct);

//get all products(filters) - /api/v1/product/all
app.get("/all", getAllProducts);

//get last 10 products - /api/v1/product/latest
app.get("/latest", getlatestProducts);

//get all unique categories - /api/v1/product/categories
app.get("/categories", getAllCategories);

//get all products - /api/v1/product/admin-products
app.get("/admin-products", isAdmin, getAdminProducts);

// get, update, delete Product
app
  .route("/:id")
  .get(getSingleProduct)
  .put(isAdmin, multerSingleUpload, updateProduct)
  .delete(isAdmin, deleteProduct);

export default app;
