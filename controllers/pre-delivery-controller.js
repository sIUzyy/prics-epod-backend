// ---- model ----
const HttpError = require("../models/error/http-error");
const PreDelivery = require("../models/schema/pre-delivery-schema");
const Shipment = require("../models/schema/shipment-schema");

// ---- controllers ----

// http://localhost:5000/api/pre-delivery/createpre-delivery - POST
const createPreDelivery = async (req, res, next) => {
  const {
    trackingNo,
    loadNo,
    receivedDate,
    receivedBy,
    productCode,
    receivedQty,
    uom,
    remarks,
  } = req.body;

  try {
    // Extract uploaded image paths
    const uploadedImages = req.files ? req.files.map((file) => file.path) : [];
    let existingPreDelivery = await PreDelivery.findOne({
      pre_delivery_trackingNo: trackingNo,
    });

    if (existingPreDelivery) {
      let productIndex = existingPreDelivery.pre_delivery_products.findIndex(
        (product) => product.productCode === productCode
      );

      if (productIndex === -1) {
        // Add new product with receivedQty and remarks
        existingPreDelivery.pre_delivery_products.push({
          productCode,
          remarks,
          receivedQty,
          uploadedImages, // store array of image paths,
        });
      } else {
        // Update existing product's remarks and receivedQty
        existingPreDelivery.pre_delivery_products[productIndex].remarks =
          remarks;
        existingPreDelivery.pre_delivery_products[productIndex].receivedQty =
          receivedQty;
        existingPreDelivery.pre_delivery_products[productIndex].uploadedImages =
          uploadedImages;
      }

      await existingPreDelivery.save();
    } else {
      // Create new entry with productCode, remarks, and receivedQty
      const preDelivery = new PreDelivery({
        pre_delivery_trackingNo: trackingNo,
        pre_delivery_loadNo: loadNo,
        pre_delivery_receivedDate: receivedDate,
        pre_delivery_receivedBy: receivedBy,
        pre_delivery_products: [
          { productCode, remarks, receivedQty, uploadedImages },
        ],
        pre_delivery_uom: uom,
      });

      await preDelivery.save();
    }

    res.status(201).json({
      message: "Pre-Delivery updated successfully",
    });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Failed to retrieve Create Pre-Delivery data . Please try again later.",
      500
    );
    return next(error);
  }
};

// http://localhost:5000/api/pre-delivery/:trackingNo - GET - Get all data by tracking no
const getPreDeliveryData = async (req, res) => {
  try {
    const trackingNo = req.params.trackingNo;

    // Check if the tracking number exists in the Shipment collection
    const shipment = await Shipment.findOne({ trackingNo });
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    // Find pre-delivery data that matches the tracking number
    const preDeliveryData = await PreDelivery.findOne({
      pre_delivery_trackingNo: trackingNo,
    });

    if (!preDeliveryData) {
      return res
        .status(200)
        .json({ message: "No pre-delivery data available", data: null });
    }

    // Return matched pre-delivery data
    return res.status(200).json(preDeliveryData);
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Failed to retrieve Pre-Delivery data . Please try again later.",
      500
    );
    return next(error);
  }
};

// ---- exports ----
exports.createPreDelivery = createPreDelivery;
exports.getPreDeliveryData = getPreDeliveryData;
