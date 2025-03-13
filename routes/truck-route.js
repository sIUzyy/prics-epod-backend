// packages
const express = require("express");
const router = express.Router();

// controller
const truckController = require("../controllers/truck-controller");

// create a truck
router.post("/createtruck", truckController.createtruck);

// get all truck list
router.get("", truckController.getTruckList);

// exports
module.exports = router;
