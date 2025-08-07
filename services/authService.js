import User from "../models/User.js";
import jwt from "jsonwebtoken";

/**
 * Generate JWT Token
 */
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

/**
 * Register a new user
 */
export const registerUserService = async (userData) => {
    const { email } = userData;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    // Create user
    const newUser = await User.create(userData);

    return {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        token: generateToken(newUser._id),
    };
};

/**
 * Login user
 */
export const loginUserService = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
        throw new Error("Invalid email or password");
    }

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
    };
};

/**
 * Get user profile
 */
export const getProfileService = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
    };
};
