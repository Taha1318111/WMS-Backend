const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const productController = require("../../controllers/Product/productController");


router.post(
  "/CreateProduct",
  upload.single("image"),  // 👈 image field name
  productController.createProduct
);

router.get("/GetAllProducts", productController.getAllProducts);
router.get("/GetProduct/:productId", productController.getProductById);
router.put("/UpdateProduct/:productId", productController.updateProduct);
router.delete("/DeleteProduct/:productId", productController.deleteProduct);
 

module.exports = router;