const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

/**
 * @openapi
 * components:
 *   schemas:
 *     products:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Coca-Cola Light
 *         type:
 *           type: string
 *           example: Gluten Free
 *         price:
 *           type: string
 *           example: 1€
 *         category:
 *           type: string
 *           example: Soda
 */

const getAllProducts = (filterParams) => {
  try {
    let products = DB.products;
    if (filterParams.type) {
      return DB.products.filter((product) =>
        product.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    return products;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getProductForName = (productName) => {
  try {
    const product = DB.products.find((product) => product.name === productName);

    if (!product) {
      throw {
        status: 400,
        message: `Can't find product with the name: '${productName}'`,
      };
    }

    return product;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewProduct = (newProduct) => {
  try {
    const isAlreadyAdded =
      DB.products.findIndex((product) => product.name === newProduct.name) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Product with the name '${product.name}' already exists`,
      };
    }

    DB.products.push(newProduct);
    saveToDatabase(DB);

    return newProduct;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneProduct = (productName, changes) => {
  try {
    const isAlreadyAdded =
      DB.products.findIndex((product) => product.name === changes.name) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Product with the name '${changes.name}' already exists`,
      };
    }

    const indexForUpdate = DB.products.findIndex(
      (product) => product.name === productName
    );

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find product with the name '${productName}'`,
      };
    }


    DB.products[indexForUpdate] = changes;
    saveToDatabase(DB);

    return changes;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneProduct = (productName) => {
  try {
    const indexForDeletion = DB.products.findIndex(
      (products) => products.name === productName
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find product with the name '${productName}'`,
      };
    }
    DB.products.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllProducts,
  getProductForName,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct
};
