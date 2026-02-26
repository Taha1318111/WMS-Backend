const jwt = require("jsonwebtoken");
const User = require("../models/User/user");

const authMiddleware = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🔎 Select only required fields (security + performance)
        const user = await User.findById(decoded.userId)
            .select("_id name email role isActive");

        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - User not active"
            });
        }

        // Attach minimal safe user object
        req.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        next();

    } catch (error) {

        console.error("Auth Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid or expired token"
        });

    }
};

module.exports = authMiddleware;