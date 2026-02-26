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

module.exports = {
  createCategory
};