// ---- model ----
const HttpError = require("../models/error/http-error");
const Product = require("../models/schema/product-schema");
const Shipment = require("../models/schema/shipment-schema");

// ---- controllers ----

// http:localhost:5000/api/productcode/createproductcode
const createProductCode = async (req, res, next) => {
  const { tracking_no, product_code, description, shipped_qty, total_cbm } =
    req.body;

  if (!tracking_no) {
    return res.status(400).json({ message: "Tracking No is required" });
  }

  try {
    // Check if shipment exists
    const shipment = await Shipment.findOne({ trackingNo: tracking_no });
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    // Create new product
    const product = new Product({
      trackingNo: tracking_no, // Linking to a Shipment
      productCode: product_code,
      description,
      shippedQty: shipped_qty,
      total_cbm_per_item: total_cbm,
    });

    await product.save();

    // Update shipment with new product ID
    shipment.productCodes.push(product._id);
    await shipment.save();

    res.status(201).json({
      message: "Product Data created successfully and linked to shipment",
      product,
    });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Failed to create Product Code data . Please try again later.",
      500
    );
    return next(error);
  }
};

// http:localhost:5000/api/productcode/:id
const getListOfProductCode = async (req, res, next) => {
  try {
    const trackingNo = req.params.id;

    // Find the shipment document by tracking number and populate the productCodes field
    const shipment = await Shipment.findOne({ trackingNo }).populate(
      "productCodes"
    );

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.status(200).json({ productCodes: shipment.productCodes });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Failed to retrieve Product Code data . Please try again later.",
      500
    );
    return next(error);
  }
};

// exports
exports.createProductCode = createProductCode;
exports.getListOfProductCode = getListOfProductCode;
