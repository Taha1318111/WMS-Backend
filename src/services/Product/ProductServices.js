const Product = require("../../models/Products/productModel");

const CreateProduct = async (data) => {

  if (!data.productId || !data.productName) {
    throw new Error("Product ID and Product Name are required");
  }

  const existing = await Product.findOne({ productId: data.productId });

  if (existing) {
    throw new Error("Product ID already exists");
  }

  const newProduct = new Product(data);
  return await newProduct.save();
};
//  Find All
const findAllProducts = async () => {
  return await Product.find({ isDeleted: false });
};

//  Find By ProductId
const findProductById = async (productId) => {

  const product = await Product.findOne({ productId: productId, isDeleted: false });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
const updateProduct = async (productId, data) => {

  const updated = await Product.findOneAndUpdate(
    { productId: productId, isDeleted: false },
    { $set: data },
    { new: true }
  );

  if (!updated) {
    throw new Error("Product not found");
  }

  return updated;
};

const softDeleteProduct = async (productId) => {

  const deletedProduct = await Product.findOneAndUpdate(
    { productId: productId, isDeleted: false },   // 🔥 Only active products
    {
      isDeleted: true,
      deletedAt: new Date()
    }

  );

  if (!deletedProduct) {
    throw new Error("Product not found or already deleted");
  }

  return { message: "Product deleted successfully" };
};
module.exports = {
  CreateProduct, findAllProducts, findProductById, updateProduct, softDeleteProduct
};