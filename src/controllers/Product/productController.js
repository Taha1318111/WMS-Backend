const productService = require("../../services/Product/ProductServices");

const createProduct = async (req, res) => {
  try {
    const product = await productService.CreateProduct(req.body);
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//  Find All
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
  createProduct,getAllProducts,getProductById,updateProduct,deleteProduct
};