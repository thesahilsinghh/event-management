import {

    getEventsService,
    getEventByIdService,
    updateEventService,
    deleteEventService,
    createEventService
} from "../services/eventService.js";

/**
 * @desc    Create new event (Admin only)
 */
export const createEvent = async (req, res) => {
    try {
        const event = await createEventService(req.body);

        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @desc    Get all events
 */
export const getEvents = async (req, res) => {
    try {
        const events = await getEventsService();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Get single event
 */
export const getEventById = async (req, res) => {
    try {
        const event = await getEventByIdService(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/**
 * @desc    Update event (Admin only)
 */
export const updateEvent = async (req, res) => {
    try {
        const event = await updateEventService(req.params.id, req.body);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/**
 * @desc    Delete event (Admin only)
 */
export const deleteEvent = async (req, res) => {
    try {
        await deleteEventService(req.params.id);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
