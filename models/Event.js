import mongoose from "mongoose";


const seatSchema = new mongoose.Schema({
    row: { type: String, required: true }, // e.g., "A", "B"
    number: { type: Number, required: true }, // e.g., 1, 2, 3
    isBooked: { type: Boolean, default: false }
}, { _id: false });


const eventSchema = new mongoose.Schema(
    {
        image: { type: String },
        title: { type: String, required: [true, "Event title is required"] },
        description: { type: String, required: [true, "Event description is required"] },
        date: { type: Date, required: [true, "Event date is required"] },
        time: { type: String, required: [true, "Event time is required"] },
        venue: { type: String, required: [true, "Venue is required"] },
        category: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        seats: [seatSchema],
        totalSeats: { type: Number, required: true },
        bookedSeats: [seatSchema]
    },
    { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
