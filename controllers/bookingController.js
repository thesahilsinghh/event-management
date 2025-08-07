import {
    createBookingService,
    getUserBookingsService,
    getAllBookingsService
} from "../services/bookingService.js";

/**
 * @desc    Create booking
 */
export const createBooking = async (req, res) => {
    try {
        const { eventId, seats } = req.body;
        const booking = await createBookingService(req.user.id, eventId, seats);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @desc    Get logged in user's bookings
 */
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await getUserBookingsService(req.user.id);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Get all bookings (admin)
 */
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await getAllBookingsService();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
