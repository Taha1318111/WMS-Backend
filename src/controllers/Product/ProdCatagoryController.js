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

module.exports = {
  createCategory
};