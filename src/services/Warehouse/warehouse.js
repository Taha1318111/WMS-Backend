const warehouseModel=require('../../models/Warehouse/warehouseModel');

const createWarehouse=async(data)=>{

    if(!data.warehouseId || !data.warehouseName){
        throw new Error("Warehouse ID and Warehouse Name are required");
    }
   
    const existing=await warehouseModel.findOne({warehouseId:data.warehouseId});

    if(existing){
        throw new Error("Warehouse ID already exists");
    }
    const newWarehouse=new warehouseModel(data);
    return await newWarehouse.save();

}


const getWarehouseById=async(warehouseId)=>{
    if(!warehouseId){
        throw new Error("Warehouse ID is required");
    } 
    const warehouse=await warehouseModel.findOne({warehouseId, isActive: true,isDeleted: false});
    if(!warehouse){
        throw new Error("Warehouse not found");
    }
    return warehouse;
}

 const getAllWarehouses = async (queryParams) => {

    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {
        isActive: true,
        isDeleted: false
    };

    const warehouses = await warehouseModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdStamp: -1 });

    const total = await warehouseModel.countDocuments(filter);

    return {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        data: warehouses
    };
};
const updateWarehouseService = async (warehouseId, payload) => {

    const existingWarehouse = await warehouseModel.findOne({
        warehouseId: warehouseId,
        isActive: true,
        isDeleted: false
    });

    if (!existingWarehouse) {
        throw new Error("Active warehouse not found");
    }

    delete payload.warehouseId;
    delete payload._id;

    const updatedWarehouse = await warehouseModel.findOneAndUpdate(
        { warehouseId: warehouseId },
        { $set: payload },
        { new: true }
    );

    return updatedWarehouse;
};

const softDeleteWarehouseService = async (warehouseId) => {

    if (!warehouseId) {
        throw new Error("WarehouseId is required");
    }

    //  Check if warehouse exists and not already deleted
    const existingWarehouse = await warehouseModel.findOne({
        warehouseId: warehouseId,
        isDeleted: false
    });

    if (!existingWarehouse) {
        throw new Error("Warehouse not found or already deleted");
    }

    // Soft delete
    const deletedWarehouse = await warehouseModel.findOneAndUpdate(
        { warehouseId: warehouseId },
        {
            $set: {
                isDeleted: true,
                isActive: false,
                DeletedAt: new Date()
            }
        },
        { new: true }
    );

    return deletedWarehouse;
};

module.exports={createWarehouse, getWarehouseById, getAllWarehouses, updateWarehouseService,softDeleteWarehouseService}