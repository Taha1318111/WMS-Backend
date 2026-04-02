const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  description: String,

  isDeleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

// ⭐ unique index only for non-deleted records
categorySchema.index(
  { categoryId: 1, isDeleted: 1 },
  { unique: true }
);

module.exports = mongoose.model("Category", categorySchema);