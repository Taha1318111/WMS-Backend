const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // --- PRIMARY IDENTIFIERS ---
  productId: { type: String, required: true, unique: true, index: true }, // Barcode ya SKU
  productTypeId: { type: String },//ye cheez frontend se aayegi
  facilityId: { type: String },

  // --- NAMES & DESCRIPTIONS ---
  productName: { type: String, trim: true ,required: true},
  internalName: { type: String, trim: true },
  brandName: { type: String, trim: true },
  description: { type: String },
  longDescription: { type: String },
  comments: { type: String },

  // --- DATES & STATUS ---
  introductionDate: { type: Date },
  releaseDate: { type: Date },
  supportDiscontinuationDate: { type: Date },
  salesDiscontinuationDate: { type: Date },
  salesDiscWhenNotAvail: { type: String, maxLength: 1 }, // char(1)
  isVirtual: { type: String, maxLength: 1 },
  isVariant: { type: String, maxLength: 1 },

  // --- IMAGES ---
  smallImageUrl: { type: String },
  mediumImageUrl: { type: String },
  largeImageUrl: { type: String },
  detailImageUrl: { type: String },
  originalImageUrl: { type: String },

  // --- INVENTORY & SHIPPING ---
  inventoryMessage: { type: String },
  requireInventory: { type: String, maxLength: 1 },
  inventoryItemTypeId: { type: String },
  quantityUomId: { type: String }, // Unit of Measure
  quantityIncluded: { type: Number },
  piecesIncluded: { type: Number },
  
  // Weights & Dimensions (Decimal fields are Numbers in Mongo)
  weightUomId: { type: String },
  productWeight: { type: Number },
  shippingWeight: { type: Number },
  
  heightUomId: { type: String },
  productHeight: { type: Number },
  shippingHeight: { type: Number },
  
  widthUomId: { type: String },
  productWidth: { type: Number },
  shippingWidth: { type: Number },
  
  depthUomId: { type: String },
  productDepth: { type: Number },
  shippingDepth: { type: Number },

  // --- PRICING & TAX ---
  priceDetailText: { type: String },
  fixedAmount: { type: Number },
  taxable: { type: String, maxLength: 1 },
  returnable: { type: String, maxLength: 1 },
  chargeShipping: { type: String, maxLength: 1 },

  // --- METADATA & STAMPS ---
  createdByUserIdLogin: { type: String },
  lastModifiedByUserIdLogin: { type: String },
  lotIdFilledIn: { type: String },
  isDeleted: {type: Boolean,default: false},
  deletedAt: {type: Date,default: null},

  categoryId: {type: String,required: false} // Foreign key to Category

}, { 
  // Yeh automatically CreatedAt aur UpdatedAt handle karega
  timestamps: { createdAt: 'createdStamp', updatedAt: 'lastUpdatedStamp' } 
});

module.exports = mongoose.model('Product', productSchema);