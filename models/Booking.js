import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
    {
        row: { type: String, required: true },
        number: { type: Number, required: true }
    },
    { _id: false }
);

const bookingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
        seatsBooked: { type: [seatSchema], required: true, validate: v => Array.isArray(v) && v.length > 0 },
        totalPrice: { type: Number, required: true }
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
