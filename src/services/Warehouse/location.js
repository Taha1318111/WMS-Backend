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

  // 🔹 Basic Validation
  if (!warehouseId) {
    throw new Error("warehouseId is required");
  }

  if (!aisle || !rack || !bin || !zone) {
    throw new Error("Aisle, Rack, Bin and Zone are required");
  }

  // 🔐 Role Check (optional if already checked in route)
  if (!["SUPER_ADMIN", "WAREHOUSE_MANAGER"].includes(user.role)) {
    throw new Error("You are not authorized to create location");
  }

  // 🔎 Check Warehouse Exists (CORRECT MODEL)
  const warehouse = await warehouseModel.findOne({
    warehouseId,
    isActive: true,
    isDeleted: false
  });
  

  if (!warehouse) {
    throw new Error("Invalid or inactive warehouse");
  }

  // 🔤 Generate locationId FIRST
  const locationId = [
    aisle,
    rack,
    bin,
    ZONE_SHORT[zone] || zone
  ]
    .join("-")
    .toUpperCase()
    .replace(/\s+/g, "");

  // 🔎 Check Duplicate Location
  const existingLocation = await locationModel.findOne({
    locationId,
    warehouseId,
    isDeleted: false
  });

  if (existingLocation) {
    throw new Error("Location already exists in this warehouse");
  }

  // ✅ Create Location
  try {
    const location = await locationModel.create({
      locationId,
      warehouseId,
      aisle,
      rack,
      bin,
      zone,
      capacity: capacity || 0,
      currentCapacityUsed: 0,
      isActive: true,
      isDeleted: false,
      deletedAt: null
    });

    return location;

  } catch (error) {

    if (error.code === 11000) {
      throw new Error("Duplicate location detected");
    }

    throw error;
  }
};

const getLocationByIdService = async (locationId) => {

  if (!locationId) {
    throw new Error("LocationId is required");
  }

  const location = await locationModel.findOne({
    locationId: locationId.trim().toUpperCase(),
    isDeleted: false
  });

  if (!location) {
    throw new Error("Location not found");
  }

  return location;
};

const getAllLocationsService = async (queryParams) => {

  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || 10;

  const skip = (page - 1) * limit;

  const filter = {
    isDeleted: false
  };

  // Optional: Filter by warehouse
  if (queryParams.warehouseId) {
    filter.warehouseId = queryParams.warehouseId.trim().toUpperCase();
  }

  const total = await locationModel.countDocuments(filter);

  const locations = await locationModel
    .find(filter)
    .sort({ createdStamp: -1 })
    .skip(skip)
    .limit(limit);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    count: locations.length,
    data: locations
  };
};

const updateLocationService = async (locationId, payload) => {

  const cleanId = locationId.trim().toUpperCase();

  const location = await locationModel.findOne({
    locationId: cleanId,
    isDeleted: false
  });

  if (!location) {
    throw new Error("Location not found");
  }

  // Capacity validation
  if (payload.capacity !== undefined) {
    if (payload.capacity < location.currentCapacityUsed) {
      throw new Error("Capacity cannot be less than used capacity");
    }
  }

  const updated = await locationModel.findOneAndUpdate(
    { locationId: cleanId },
    payload,
    { new: true }
  );

  return updated;
};

const softDeleteLocationService = async (locationId, user) => {

  const cleanId = locationId.trim().toUpperCase();

  const location = await locationModel.findOne({
    locationId: cleanId,
    isDeleted: false
  });

  if (!location) {
    throw new Error("Location not found");
  }

  if (location.currentCapacityUsed > 0) {
    throw new Error("Cannot delete location with inventory");
  }

  const deleted = await locationModel.findOneAndUpdate(
    { locationId: cleanId },
    {
      isDeleted: true,
      DeletedAt: new Date(),
      DeletedBy: user._id
    },
    { new: true }
  );

  return deleted;
};
module.exports = {
  createLocationService,
  getLocationByIdService,
  getAllLocationsService,
  updateLocationService,
softDeleteLocationService
    
};