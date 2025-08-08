import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

/**
 * Book seats for an event
 */
export const createBookingService = async (userId, eventId, selectedSeats) => {
    const event = await Event.findById(eventId);
    if (!event) throw new Error("Event not found");

    // Check if any selected seat is already booked
    const alreadyBooked = selectedSeats.filter((seat) =>
        event.seats.some(
            (s) => s.row === seat.row && s.number === seat.number && s.isBooked
        )
    );

    if (alreadyBooked.length > 0) {
        throw new Error(
            `Seats already booked: ${alreadyBooked
                .map((s) => `${s.row}${s.number}`)
                .join(", ")}`
        );
    }

    // Update isBooked field in seats
    event.seats = event.seats.map((s) => {
        const match = selectedSeats.some(
            (seat) => seat.row === s.row && seat.number === s.number
        );
        return match ? { ...s.toObject(), isBooked: true } : s;
    });

    // Also keep track in bookedSeats array
    event.bookedSeats.push(...selectedSeats);

    await event.save();

    // Calculate total price
    const totalPrice = event.price * selectedSeats.length;

    // Create booking record
    const booking = await Booking.create({
        user: userId,
        event: eventId,
        seatsBooked: selectedSeats,
        totalPrice,
    });

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
