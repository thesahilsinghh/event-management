import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

/**
 * Book seats for an event
 */
export const createBookingService = async (userId, eventId, seats) => {
    // Check event exists
    const event = await Event.findById(eventId);
    if (!event) throw new Error("Event not found");

    // Check seat availability
    const availableSeats = event.totalSeats - event.bookedSeats;
    if (seats > availableSeats) {
        throw new Error("Not enough seats available");
    }

    // Calculate total price
    const totalPrice = event.price * seats;

    // Create booking
    const booking = await Booking.create({ user: userId, event: eventId, seatsBooked: seats, totalPrice });

    // Update event's booked seats
    event.bookedSeats += seats;
    await event.save();

    return booking;
};

/**
 * Get all bookings for a user
 */
export const getUserBookingsService = async (userId) => {
    return await Booking.find({ user: userId }).populate("event");
};

/**
 * Get all bookings (admin)
 */
export const getAllBookingsService = async () => {
    return await Booking.find().populate("user").populate("event");
};
