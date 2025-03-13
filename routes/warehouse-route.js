// packages
const express = require("express");
const router = express.Router();

// controller
const warehouseController = require("../controllers/warehouse-controller");

// create a warehouse
router.post("/createwarehouse", warehouseController.createWarehouse);

// get all warehouse list
router.get("", warehouseController.getWarehouse);

// exports
module.exports = router;
