// ---- model ----
const HttpError = require("../models/error/http-error");
const Shipment = require("../models/schema/shipment-schema");
const Product = require("../models/schema/product-schema");

// ---- controllers ----

// http://localhost:5000/api/shipment/createshipment - POST
const createShipment = async (req, res, next) => {
  const {
    tracking_no,
    customer_name,
    address,
    load_no,
    uom,
    shipped_date,
    waybill_no,
    cv_no,
    plate_no,
    driver_name,
    status,
    epodStatus,
  } = req.body;

  try {
    const shipment = new Shipment({
      trackingNo: tracking_no,
      customerName: customer_name,
      address,
      loadNo: load_no,
      uom,
      shippedDate: shipped_date,
      waybillNo: waybill_no,
      cvNo: cv_no,
      plateNo: plate_no,
      driverName: driver_name,
      status,
      epodStatus,
      productCodes: [], // empty initially
    });

    await shipment.save();

    res.status(201).json({
      message: "Shipment created successfully",
      shipment,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Failed to create shipment. Please try again later",
      500
    );
    return next(error);
  }
};

//http://localhost:5000/api/shipment - GET - Fetch all shipments
const getShipment = async (req, res, next) => {
  try {
    const shipments = await Shipment.find().populate({
      path: "productCodes",
      model: "Product", // Ensure it references the Product model
    });

    res.status(200).json({ shipments });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Failed to retrieve Shipment data. Please try again later.",
      500
    );
    return next(error);
  }
};

//http://locahost:5000/api/shipment/pre-delivery/:trackingNo - GET - Fetch shipment by tracking no
const getShipmentByTrackingNo = async (req, res) => {
  try {
    const trackingNo = req.params.trackingNo;

    const shipment = await Shipment.findOne({ trackingNo }).populate(
      "productCodes"
    );

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.status(200).json({ message: "success", shipment });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Failed to retrieve Shipment by tracking no., . Please try again later.",
      500
    );
    return next(error);
  }
};

//http://locahost:5000/api/shipment/:plate-no - GET - Fetch shipment by plate number
const getShipmentByPlateNo = async (req, res) => {
  try {
    const plateNo = req.params.id; // Get the plate number from the request

    const shipments = await Shipment.find({ plateNo }).populate("productCodes"); // Find shipments by plate number

    res.status(200).json(shipments); // Always return shipments (empty array if none found)
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Failed to retrieve Shipment by Plate no., . Please try again later.",
      500
    );
    return next(error);
  }
};

// http://localhost:5000/api/shipment/:trackingNo/update-epod-status - PATCH - update the epod status
const updateShipmentEPODStatus = async (req, res, next) => {
  const { trackingNo } = req.params;
  const { epodStatus } = req.body; // Get status from request body

  try {
    const shipment = await Shipment.findOneAndUpdate(
      { trackingNo },
      { epodStatus }, // Dynamically set the status
      { new: true }
    );

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.status(200).json({
      message: `Shipment EPOD status updated to ${epodStatus}`,
      shipment,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to update EPOD status. Please try again later.",
    });
  }
};

// http://localhost:5000/api/shipment/:trackingNo/update-priority - PATCH - update the priority order
const updateShipmentPriority = async (req, res, next) => {
  const { trackingNo } = req.params;
  const { priority } = req.body;

  try {
    // Find and update the shipment
    const shipment = await Shipment.findOneAndUpdate(
      { trackingNo },
      { priority }, // Update priority field
      { new: true } // Return the updated document
    );

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.status(200).json({
      message: `Shipment priority updated to ${priority}`,
      shipment,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to update shipment priority. Please try again later.",
    });
  }
};

// http://localhost:5000/api/shipment/:id
const deleteShipmentData = async (req, res, next) => {
  const trackingNo = req.params.trackingNo; // Corrected

  try {
    // Find the shipment by trackingNo
    const shipment = await Shipment.findOne({ trackingNo });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    // Delete the shipment
    await Shipment.deleteOne({ trackingNo });

    res.status(200).json({ message: "Shipment deleted successfully" });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Failed to delete shipment data . Please try again later.",
      500
    );
    return next(error);
  }
};

// ---- exports ----
exports.createShipment = createShipment;
exports.getShipment = getShipment;
exports.getShipmentByPlateNo = getShipmentByPlateNo;
exports.getShipmentByTrackingNo = getShipmentByTrackingNo;
exports.updateShipmentEPODStatus = updateShipmentEPODStatus;
exports.updateShipmentPriority = updateShipmentPriority;
exports.deleteShipmentData = deleteShipmentData;
