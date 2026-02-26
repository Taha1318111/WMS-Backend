const WarehouseServices = require('../../services/Warehouse/warehouse');

const createWarehouse = async (req, res) => {
    try {
        const data = req.body;
        const result = await WarehouseServices.createWarehouse(data);
        res.status(201).json({ message: "Warehouse created successfully", warehouse: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }   
}

const getWarehouseById = async (req, res) => {
    try {
        const warehouseId = req.params.id;
        const warehouse = await WarehouseServices.getWarehouseById(warehouseId);
        res.status(200).json({ warehouse });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const getAllWarehouses = async (req, res) => {
    try {

        const result = await WarehouseServices.getAllWarehouses(req.query);

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};
const updateWarehouse = async (req, res) => {
    try {

        const warehouseId = req.params.id;

        const updatedWarehouse = await WarehouseServices.updateWarehouseService(
            warehouseId,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Warehouse updated successfully",
            data: updatedWarehouse
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const softDeleteWarehouse = async (req, res) => {

    try {

        const warehouseId = req.params.id;

        const deletedWarehouse = await WarehouseServices.softDeleteWarehouseService(warehouseId);

        return res.status(200).json({
            success: true,
            message: "Warehouse soft deleted successfully",
            data: deletedWarehouse
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};
module.exports = { createWarehouse, getWarehouseById,getAllWarehouses,updateWarehouse,softDeleteWarehouse }