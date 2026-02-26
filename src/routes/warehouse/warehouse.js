const express = require("express");
const router = express.Router();
const warehouseCont = require("../../controllers/warehouse/warehouse");

router.post("/CreateWarehouse", warehouseCont.createWarehouse);
router.get("/GetWarehouseById/:id", warehouseCont.getWarehouseById);
router.get("/GetAllWarehouses", warehouseCont.getAllWarehouses);
router.put("/UpdateWarehouse/:id", warehouseCont.updateWarehouse);
router.delete("/SoftDeleteWarehouse/:id", warehouseCont.softDeleteWarehouse);
module.exports = router;