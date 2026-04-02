const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({

  warehouseId: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },

  warehouseName: {
    type: String,
    required: true,
    trim: true
  },

  warehouseIdType: {
    type: String,
    trim: true
  },

  Area: {
    type: Number,
    default: 0
  },

  AreaUomId: {
    type: String,
    default: "SQFT"
  },

  Capacity: {
    type: Number,
    default: 0
  },

  CapacityUomId: {
    type: String,
    default: "Tons"
  },

  Status: {
    type: String,
    maxlength: 1,
    default: "A"   // A = Active, I = Inactive
  },

  Address: {
    type: String,
    trim: true
  },

  City: {
    type: String,
    trim: true
  },

  State: {
    type: String,
    trim: true
  },

  PostalCode: {
    type: String,
    match: /^[0-9]{5,6}$/
  },

  Country: {
    type: String,
    default: "India"
  },

  ContactPerson: {
    type: String,
    trim: true
  },

  ContactEmail: {
    type: String,
    match: /^\S+@\S+\.\S+$/
  },

  ContactPhone: {
    type: String,
    match: /^[0-9]{10,15}$/
  },

  notes: {
    type: String
  },

  isActive: {
    type: Boolean,
    default: true
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  DeletedAt: {
    type: Date
  }

},{
  timestamps: { 
    createdAt: 'createdStamp', 
    updatedAt: 'lastUpdatedStamp' 
  }
});


// Index for fast search
warehouseSchema.index({ warehouseId: 1 });
warehouseSchema.index({ City: 1 });
warehouseSchema.index({ isDeleted: 1 });

module.exports = mongoose.model('Warehouse', warehouseSchema);