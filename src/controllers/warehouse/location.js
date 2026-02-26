const { createLocationService } = require("../../services/Warehouse/location");

const createLocation = async (req, res) => {
    try {

        const user = req.user;  //  From JWT middleware

        const location = await createLocationService(req.body, user);

        return res.status(201).json({
            success: true,
            message: "Location created successfully",
            data: location
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createLocation
};