// packages
const express = require("express");
const router = express.Router();

// middleware for file upload
const fileUpload = require("../middleware/file-upload");

// controller
const preDeliveryController = require("../controllers/pre-delivery-controller");

// create a pre-delivery
router.post(
  "/createpre-delivery",
  fileUpload.array("image", 5), // up to 5 images
  preDeliveryController.createPreDelivery
);

// get the data by tracking no
router.get("/:trackingNo", preDeliveryController.getPreDeliveryData);

// exports
module.exports = router;
