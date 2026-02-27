const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // --- PRIMARY IDENTIFIERS ---
    productId: { type: String, required: true },
    productTypeId: { type: String },
    facilityId: { type: String },

    // --- NAMES & DESCRIPTIONS ---
    productName: { type: String, trim: true, required: true },
    internalName: { type: String, trim: true },
    brandName: { type: String, trim: true },
    description: { type: String },
    longDescription: { type: String },
    comments: { type: String },

    // --- INVENTORY ---
    quantityUomId: { type: String },
    quantityIncluded: { type: Number },
    piecesIncluded: { type: Number },

    weightUomId: { type: String },
    productWeight: { type: Number },
    shippingWeight: { type: Number },

    // --- PRICING ---
    fixedAmount: { type: Number },

    // --- SOFT DELETE ---
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },

    // --- METADATA ---
    createdByUserIdLogin: { type: String },
    lastModifiedByUserIdLogin: { type: String },
  },
  {
    timestamps: { createdAt: "createdStamp", updatedAt: "lastUpdatedStamp" },
  }
);

//
// ✅ PARTIAL UNIQUE INDEX (IMPORTANT)
//
productSchema.index(
  { productId: 1 },
  {
    unique: true,
    partialFilterExpression: { isDeleted: false },
  }
);

//
// ✅ GLOBAL FILTER (Hide Deleted Automatically)
//
productSchema.pre(/^find/, function () {
  this.where({ isDeleted: false });
});

module.exports = mongoose.model("Product", productSchema);