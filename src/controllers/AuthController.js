const {registerService} = require("../services/Authentication/Auth") 
const {loginService} = require("../services/Authentication/Login")
 const register = async (req, res) => {
    try {

        const user = await registerService(req.body);

        res.status(201).json({
            success: true,
            message: "User registered",
            data: user
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

 const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const result = await loginService(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            ...result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {register, login};