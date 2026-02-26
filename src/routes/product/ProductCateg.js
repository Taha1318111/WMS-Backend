const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/Product/ProdCatagoryController");
router.post("/CreateCategory", categoryController.createCategory);
module.exports = router;