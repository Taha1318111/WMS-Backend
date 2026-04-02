const productService = require("../../services/Product/ProductServices");

const createProduct = async (req, res) => {
  try {

    const productData = {
      ...req.body,
      imageUrl: req.file
        ? `uploads/products/${req.file.filename}`
        : null
    };
    console.log("Received product data:", productData);
    const product = await productService.CreateProduct(productData);

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//  Find All
const getAllProducts = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const result = await productService.findAllProducts(page, limit);

    res.json({
      success: true,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
      data: result.data
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

//  Find By ProductId
const getProductById = async (req, res) => {
  try {
    const product = await productService.findProductById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const AllProductId=async(req,res)=>{
  try {
    const productIds = await productService.AllProductId();
    res.status(200).json({ productIds });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
const updateProduct = async (req, res) => {
  try {
    const updated = await productService.updateProduct(
      req.params.productId,
      req.body
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updated
    });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const result = await productService.softDeleteProduct(
      req.params.productId
    );

    res.status(200).json(result);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = {
  createProduct, getAllProducts, getProductById, updateProduct, deleteProduct,AllProductId
};