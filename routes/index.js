import express from 'express';
import authRoutes from './authRoutes.js';
import eventRoutes from './eventRoutes.js';
import bookingRoutes from './bookingRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes)
router.use('/events', eventRoutes)
router.use("/bookings", bookingRoutes);


export default router;