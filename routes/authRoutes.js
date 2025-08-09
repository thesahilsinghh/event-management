import express from "express";
import { registerUser, loginUser, getProfile, getAllUsers } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/profile", protect, getProfile);

//admin routes
authRoutes.get('/', protect, adminMiddleware, getAllUsers)

export default authRoutes;
