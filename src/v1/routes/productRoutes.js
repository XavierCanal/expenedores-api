const express = require("express");
const workoutController = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");
const productController = require("../../controllers/ProductController");

const router = express.Router();

router
  .get("/", productController.getAllProducts)
  .get("/:productName", productController.getOneProduct)
  .get("/:workoutId/records", recordController.getRecordForWorkout)
  .post("/", productController.createNewProduct)
  .patch("/:productName", productController.updateOneProduct)
  .delete("/:productName", productController.deleteOneProduct);

module.exports = router;
