const categoryService = require("../../services/Product/productCategory");

const createCategory = async (req, res) => {
  try {

    const category = await categoryService.createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {

  try {

    const categories = await categoryService.getAllCategories();

    res.status(200).json({
      success: true,
      data: categories
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// Get Category By ID
const getCategoryById = async (req, res) => {

  try {

    const category = await categoryService.getCategoryById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// Update Category
const updateCategory = async (req, res) => {

  try {

    const category = await categoryService.updateCategory(
      req.params.categoryId,
      req.body
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};


// Soft Delete Category
const deleteCategory = async (req, res) => {

  try {

    const category = await categoryService.deleteCategory(req.params.categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};