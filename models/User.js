import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Name is required"] },
        phone: { type: Number, required: [true, "Phone number is required"] },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Invalid email format"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            select: false,
        },
        role: { type: String, enum: ["user", "admin"], default: "user" }
    },
    { timestamps: true }
);
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
