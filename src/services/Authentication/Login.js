const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");    
const  User = require("../../models/User/user");


const loginService = async (email, password) => {

    const user = await User.findOne({ email, isActive: true });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {
    loginService
};