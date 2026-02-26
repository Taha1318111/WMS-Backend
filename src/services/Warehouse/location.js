const locationModel = require("../../models/Warehouse/location");
const warehouseModel = require("../../models/Warehouse/warehouseModel");

const ZONE_SHORT = {
  FAST_MOVING: "FM",
  BULK: "BK",
  QC: "QC",
  REJECTION: "RJ",
  STAGING: "ST"
};

const createLocationService = async (payload, user) => {

    const { warehouseId, aisle, rack, bin, zone, capacity } = payload;

    if (!warehouseId) {
        throw new Error("warehouseId is required");
    }

    // 🔐 Role Check
    if (!["SUPER_ADMIN", "WAREHOUSE_MANAGER"].includes(user.role)) {
        throw new Error("You are not authorized to create location");
    }

    // 🔎 Check warehouse exists
    const warehouse = await warehouseModel.findOne({
        warehouseId,
        isActive: true,
        isDelete: false
    });

    if (!warehouse) {
        throw new Error("Invalid or inactive warehouse");
    }

    // 🔤 Dynamic LocationId
    let parts = [];

    if (aisle) parts.push(aisle);
    if (rack) parts.push(rack);
    if (bin) parts.push(bin);
    if (zone) parts.push(ZONE_SHORT[zone] || zone);

    if (parts.length === 0) {
        throw new Error("At least one location field required");
    }

    const locationId = parts
        .join("-")
        .toUpperCase()
        .replace(/\s+/g, "");

    const existingLocation = await locationModel.findOne({
        locationId,
        warehouseId,
        isDelete: false
    });

    if (existingLocation) {
        throw new Error("Location already exists in this warehouse");
    }

    const location = await locationModel.create({
        locationId,
        warehouseId,
        aisle: aisle || null,
        rack: rack || null,
        bin: bin || null,
        zone: zone || null,
        capacity: capacity || 0,
        currentCapacityUsed: 0,
        isActive: true,
        isDelete: false,
        deletedAt: null,

        createdBy: user.email,   // 🔥 Track by email
        createdById: user._id    // 🔥 Better tracking
    });

    return location;
};

module.exports = {
    createLocationService
};