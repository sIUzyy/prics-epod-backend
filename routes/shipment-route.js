// packages
const express = require("express");
const router = express.Router();

// controller
const shipmentController = require("../controllers/shipment-controller");

// create a shipment
router.post("/createshipment", shipmentController.createShipment);

// get all the shipment
router.get("", shipmentController.getShipment);

// get all the shipment data by plate number - driver
router.get("/:id", shipmentController.getShipmentByPlateNo);

// get all the shipment data by tracking no - driver
router.get(
  "/pre-delivery/:trackingNo",
  shipmentController.getShipmentByTrackingNo
);

// update the epod status
router.patch(
  "/:trackingNo/update-epod-status",
  shipmentController.updateShipmentEPODStatus
);

// delete shipment
router.delete("/:trackingNo", shipmentController.deleteShipmentData);

// exports
module.exports = router;
