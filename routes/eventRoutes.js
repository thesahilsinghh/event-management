import express from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const eventRoutes = express.Router();

// Public
eventRoutes.get("/", getEvents);
eventRoutes.get("/:id", getEventById);

// Admin only (for now we'll just protect — later we'll add admin check)
eventRoutes.post("/", protect, createEvent);
eventRoutes.put("/:id", protect, updateEvent);
eventRoutes.delete("/:id", protect, deleteEvent);

export default eventRoutes;
