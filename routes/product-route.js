// packages
const express = require("express");
const router = express.Router();

// controller
const productController = require("../controllers/product-controller");

// create a product
router.post("/createproductcode", productController.createProductCode);

// get the list of product code by tracking number
router.get("/:id", productController.getListOfProductCode);

// exports
module.exports = router;
