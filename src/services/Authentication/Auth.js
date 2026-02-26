const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");    
const  User = require("../../models/User/user");


const registerService = async (payload) => {
    const {  email, password } = payload;
    console.log(payload.password);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      
        email,
        password: hashedPassword
    });

    return user;
};

module.exports = {registerService};  