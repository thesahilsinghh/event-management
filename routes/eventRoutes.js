import express from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const eventRoutes = express.Router();

// Public
eventRoutes.get("/", getEvents);
eventRoutes.get("/:id", getEventById);

// Admin only
eventRoutes.post("/", protect, adminMiddleware, createEvent);
eventRoutes.put("/:id", protect, adminMiddleware, updateEvent);
eventRoutes.delete("/:id", protect, adminMiddleware, deleteEvent);

export default eventRoutes;
