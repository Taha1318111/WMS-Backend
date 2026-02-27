const { createLocationService } = require("../../services/Warehouse/location");
const { getLocationByIdService } = require("../../services/Warehouse/location");
const { getAllLocationsService } = require("../../services/Warehouse/location");
const { updateLocationService } = require("../../services/Warehouse/location");
const { softDeleteLocationService } = require("../../services/Warehouse/location");


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

const getLocationById = async (req, res) => {
  try {

    const { locationId } = req.params;

    const location = await getLocationByIdService(locationId);

    return res.status(200).json({
      success: true,
      data: location
    });

  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

const getAllLocations = async (req, res) => {
  try {

    const result = await getAllLocationsService(req.query);

    return res.status(200).json({
      success: true,
      ...result
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const updateLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const result = await updateLocationService(locationId, req.body);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const softDeleteLocation = async (req, res) => {
  try {

    const { locationId } = req.params;
    const user = req.user;

    const result = await softDeleteLocationService(locationId, user);

    res.status(200).json({
      success: true,
      message: "Location soft deleted",
      data: result
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
    createLocation,
    getLocationById,
    getAllLocations,
    updateLocation,
    softDeleteLocation  
};