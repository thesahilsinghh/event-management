import express from "express";
import { createBooking, getUserBookings, getAllBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingRoutes = express.Router();

// User routes
bookingRoutes.post("/", protect, createBooking);
bookingRoutes.get("/me", protect, getUserBookings);

// Admin route
bookingRoutes.get("/", protect, getAllBookings);

export default bookingRoutes;
