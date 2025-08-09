export const adminMiddleware = (req, res, next) => {
    try {
        // Check if user is set by your auth middleware
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        // Check role
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Pass control to next middleware or route handler
        next();
    } catch (error) {
        res.status(500).json({ message: "Server error in admin check", error: error.message });
    }
};
