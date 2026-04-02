// services/party/partyService.js

const bcrypt = require("bcryptjs");
const Party = require('../../models/Party/Party');
const User = require('../../models/User/user');

const createPartyWithUser = async (data) => {
    const { password, PartyId, email, PartyType, ...partyData } = data;

    // ✅ Basic validation
    if (!PartyId || !PartyType || !email) {
        throw new Error("PartyId, PartyType and Email are required");
    }

    // 🔥 Duplicate Party check
    const existingParty = await Party.findOne({
        $or: [{ PartyId }, { email }]
    });

    if (existingParty) {
        throw new Error("Party already exists with same PartyId or Email");
    }

    // ✅ Create Party first
    const party = await Party.create({
        PartyId,
        PartyType,
        email,
        ...partyData
    });

    let user = null;

    // 🔥 ONLY create user if PartyType = EMPLOYEE or PERSON
    if (PartyType === "EMPLOYEE" || PartyType === "PERSON") {

        if (!password) {
            throw new Error("Password is required for login user");
        }

        // 🔥 Check duplicate user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists with this email");
        }

        // 🔐 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create User
        user = await User.create({
            email,
            password: hashedPassword,
            partyId: party._id
        });
    }

    return {
        party,
        user, // null hoga agar supplier/vendor hai
        message: user
            ? "Party and User created"
            : "Party created (No login for this type)"
    };
};

const getAllParties = async () => {
    return await Party.find();
};

module.exports = {
    createPartyWithUser,
    getAllParties
};