import Event from "../models/Event.js";
import generateSeats from "../utils/generateSeats.js";

/**
 * Create Event
 */
export const createEventService = async (eventData) => {
    const { title, description, date, time, venue, category, price, rows, cols, image } = eventData;
    const seats = generateSeats(rows || 10, cols || 12);
    const event = new Event({ title, description, date, time, venue, category, price, image, seats, totalSeats: seats.length, bookedSeats: [] });
    return await event.save();
};

/**
 * Get All Events (with optional filters)
 */
export const getEventsService = async () => {
    return await Event.find().sort({ date: 1 });
};

/**
 * Get Single Event
 */
export const getEventByIdService = async (id) => {
    const event = await Event.findById(id);
    if (!event) throw new Error("Event not found");
    return event;
};

/**
 * Update Event
 */
export const updateEventService = async (id, updateData) => {
    const { title, description, date, time, venue, category, price, rows, cols, image } = updateData;
    const seats = generateSeats(rows || 10, cols || 12);

    const event = await Event.findByIdAndUpdate(id, { title, description, date, time, venue, category, price, image, seats, totalSeats: seats.length, }, { new: true });
    if (!event) throw new Error("Event not found");
    return event;
};

/**
 * Delete Event
 */
export const deleteEventService = async (id) => {
    const event = await Event.findByIdAndDelete(id);
    if (!event) throw new Error("Event not found");
    return event;
};
