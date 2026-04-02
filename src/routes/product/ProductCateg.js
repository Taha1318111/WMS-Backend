const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/Product/ProdCatagoryController");
router.post("/CreateCategory", categoryController.createCategory);

router.get("/getAllCategories", categoryController.getAllCategories);

router.get("/getCategory/:categoryId", categoryController.getCategoryById);

router.put("/updateCategory/:categoryId", categoryController.updateCategory);

router.delete("/deleteCategory/:categoryId", categoryController.deleteCategory);
module.exports = router;