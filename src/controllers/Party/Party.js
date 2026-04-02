// controllers/partyController.js

const partyService = require('../../services/Party/Party');

// Create Party + User
exports.createParty = async (req, res) => {
    try {
        const result = await partyService.createPartyWithUser(req.body);

        res.status(201).json({
            success: true,
            message: "Party and User created successfully",
            data: result
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// Get All Parties
exports.getAllParties = async (req, res) => {
    try {
        const parties = await partyService.getAllParties();

        res.status(200).json({
            success: true,
            data: parties
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};