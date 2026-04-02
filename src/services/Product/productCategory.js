const Category = require("../../models/Products/productCatagory");

const createCategory = async (data) => {

  // Check duplicate
  const existing = await Category.findOne({
    categoryId: data.categoryId,
    isDeleted: false
    
  });

  if (existing) {
    throw new Error("Category ID already exists");
  }

  const newCategory = new Category(data);
  return await newCategory.save();
};

// Get All Categories
const getAllCategories = async () => {

  return await Category.find({ isDeleted: false });

};

// Get Category By ID
const getCategoryById = async (categoryId) => {

  return await Category.findOne({
    categoryId: categoryId,
    isDeleted: false
  });

};


// Update Category
const updateCategory = async (categoryId, data) => {

  // categoryId ko update hone se prevent karo
  delete data.categoryId;

  const updated = await Category.findOneAndUpdate(
    { categoryId: categoryId, isDeleted: false },
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new Error("Category not found");
  }

  return updated;
};


// Soft Delete Category
const deleteCategory = async (categoryId) => {

  return await Category.findOneAndUpdate(
    { categoryId: categoryId },
    { $set: { isDeleted: true } },
    { new: true }
  );

};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};