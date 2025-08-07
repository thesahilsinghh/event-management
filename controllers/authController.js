import {
    registerUserService,
    loginUserService,
    getProfileService,
} from "../services/authService.js";

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 */
export const registerUser = async (req, res) => {
    try {
        const data = await registerUserService(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 */
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await loginUserService(email, password);
        res.status(200).json(data);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

/**
 * @desc    Get profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getProfile = async (req, res) => {
    try {
        const data = await getProfileService(req.user.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
