// routes/party/roleRoutes.js

const express = require('express');
const router = express.Router();

const roleController = require('../../controllers/Role/role');

router.post('/assignRole', roleController.assignRole);
router.get('/GetRoles/:partyId', roleController.getRolesByParty);

module.exports = router;