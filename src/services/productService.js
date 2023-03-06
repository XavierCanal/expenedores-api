const { v4: uuid } = require("uuid");
const Workout = require("../database/Workout");
const Product = require("../database/Product");

const getAllProducts = (filterParams) => {
  try {
    const allProducts = Product.getAllProducts(filterParams);
    return allProducts;
  } catch (error) {
    throw error;
  }
};

const getProductForName = (productName) => {
  try {
    const product = Product.getProductForName(productName);
    return product;
  } catch (error) {
    throw error;
  }
};

const createNewProduct = (newProduct) => {
  try {
    const createdProduct = Product.createNewProduct(newProduct);
    return createdProduct;
  } catch (error) {
    throw error;
  }
};

const updateOneProduct = (workoutId, changes) => {
  try {
    const updatedProduct = Product.updateOneProduct(workoutId, changes);
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const deleteOneProduct = (productName) => {
  try {
    Product.deleteOneProduct(productName);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductForName,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct
};
