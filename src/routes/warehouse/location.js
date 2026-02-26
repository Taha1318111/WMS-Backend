const express = require("express");
const router = express.Router();
const location = require("../../controllers/warehouse/location");

router.post("/CreateLocation", location.createLocation);

module.exports = router;