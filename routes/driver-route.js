// packages
const express = require("express");
const router = express.Router();

// controller
const driverController = require("../controllers/driver-controller");

// create a driver
router.post("/createdriver", driverController.createDriver);

// get a driver list
router.get("", driverController.getDriverList);

// exports
module.exports = router;
