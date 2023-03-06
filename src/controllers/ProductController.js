const productService = require("../services/productService");

const getAllProducts = (req, res) => {
  const { mode } = req.query;
  try {
    const allProducts = productService.getAllProducts({ mode });
    res.send({ status: "OK", data: allProducts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneProduct = (req, res) => {
  const {
    params: { productName },
  } = req;

  if (!productName) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':productName' can not be empty" },
    });
    return;
  }

  try {
    const product = productService.getProductForName(productName);
    res.send({ status: "OK", data: product });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewProduct = (req, res) => {
  const { body } = req;

  if (
    !body.name ||
    !body.type ||
    !body.price ||
    !body.category
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'type', 'price', 'category'",
      },
    });
  }

  const newProduct = {
    name: body.name,
    type: body.type,
    price: body.price,
    category: body.category
  };

  try {
    const createdProduct = productService.createNewProduct(newProduct);
    res.status(201).send({ status: "OK", data: createdProduct });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const updateOneProduct = (req, res) => {
  const {
    body,
    params: { productName },
  } = req;

  if (!productName) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':productName' can not be empty" },
    });
  }

  try {
    const updatedProduct = productService.updateOneProduct(productName, body);
    res.send({ status: "OK", data: updatedProduct });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneProduct = (req, res) => {
  const {
    params: { productName },
  } = req;

  if (!productName) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':productName' can not be empty" },
    });
  }

  try {
    productService.deleteOneProduct(productName);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct
};
