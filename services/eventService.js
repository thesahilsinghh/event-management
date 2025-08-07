import Event from "../models/Event.js";

/**
 * Create Event
 */
export const createEventService = async (eventData) => {
    return await Event.create(eventData);
};

/**
 * Get All Events (with optional filters)
 */
export const getEventsService = async (filters = {}) => {
    return await Event.find(filters).sort({ date: 1 });
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
    const event = await Event.findByIdAndUpdate(id, updateData, { new: true });
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
