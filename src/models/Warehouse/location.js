const mongoose = require("mongoose");
const { Schema } = mongoose;

const ZONE_SHORT = {
  FAST_MOVING: "FM",
  BULK: "BK",
  QC: "QC",
  REJECTION: "RJ",
  STAGING: "ST"
};

const locationSchema = new Schema({
    locationId:{ 
        type:String, 
        unique:true, 
        index:true 
    },

   warehouseId: {
  type: String,
  required: true
},

    aisle: { type: String, required: true },
    rack: { type: String, required: true },
    bin: { type: String, required: true },

    zone: {
        type: String,
        enum: ["FAST_MOVING", "BULK", "QC", "REJECTION", "STAGING"],
        required: true
    },

    capacity: { type: Number, default: 0 },
    currentCapacityUsed: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    DeletedAt: { type: Date },
    DeletedBy: { type: Schema.Types.ObjectId, ref: "User" }


},{
  timestamps: { createdAt: 'createdStamp', updatedAt: 'lastUpdatedStamp' }
});

locationSchema.index(
  { warehouseId: 1, aisle: 1, rack: 1, bin: 1, zone: 1 },
  { unique: true }
);

module.exports = mongoose.model('Location', locationSchema);