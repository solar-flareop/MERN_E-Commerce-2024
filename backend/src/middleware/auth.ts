import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const isAdmin = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  if (!id) return next(new ErrorHandler("Id unavailable, please login", 401));
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid id", 401));
  if (user.role !== "admin")
    return next(new ErrorHandler("Unauthorized access by user", 403));
  next();
});
