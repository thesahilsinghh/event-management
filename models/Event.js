import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: [true, "Event title is required"] },
        description: { type: String, required: [true, "Event description is required"] },
        date: { type: Date, required: [true, "Event date is required"] },
        time: { type: String, required: [true, "Event time is required"] },
        venue: { type: String, required: [true, "Venue is required"] },
        category: { type: String, required: true }, // e.g., concert, conference
        price: { type: Number, required: true, min: 0 },
        totalSeats: { type: Number, required: true },
        bookedSeats: { type: Number, default: 0 }
    },
    { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
