// controllers/party/roleController.js

const roleService = require('../../services/Role/role');

// ✅ Assign Role
exports.assignRole = async (req, res) => {
    try {
        const result = await roleService.assignRole(req.body);

        res.status(201).json({
            success: true,
            data: result
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// ✅ Get Roles by Party
exports.getRolesByParty = async (req, res) => {
    try {
        const data = await roleService.getRolesByParty(req.params.partyId);

        res.status(200).json({
            success: true,
            data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};