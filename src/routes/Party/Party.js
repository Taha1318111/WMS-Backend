// routes/party/partyRoutes.js

const express = require('express');
const router = express.Router();

const partyController = require('../../controllers/Party/Party');

//  Create Party + User
router.post('/createParty', partyController.createParty);

//  Get All Parties
router.get('/GetAllParties', partyController.getAllParties);

module.exports = router;