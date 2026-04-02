const express = require("express");
const router = express.Router();
const controller = require("../../controllers/order/order");

// ✅ Create Order (PO / SO dono)
router.post("/createOrder", controller.createOrder);
router.put("/updateOrderStatus", controller.updateOrderStatusController);
router.get("/getAllOrders", controller.getAllOrdersController);
router.get("/AllOrderId", controller.AllOrderId);


module.exports = router;