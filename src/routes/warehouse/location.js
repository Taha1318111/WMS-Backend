const express = require("express");
const router = express.Router();
const location = require("../../controllers/warehouse/location");

router.post("/CreateLocation", location.createLocation);
router.get("/GetAllLocations", location.getAllLocations);
router.get("/GetLocationById/:locationId", location.getLocationById);
router.put("/UpdateLocation/:locationId", location.updateLocation);
router.delete("/DeleteLocation/:locationId", location.softDeleteLocation);  

module.exports = router;