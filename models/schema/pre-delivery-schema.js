const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// SCHEMA WHEN USER SCAN THE TRACKING NO.
const preDeliverySchema = new Schema({
  pre_delivery_trackingNo: { type: String, required: true },
  pre_delivery_loadNo: { type: String, required: true },
  pre_delivery_receivedDate: { type: Date, required: true },
  pre_delivery_receivedBy: { type: String, required: true },
  pre_delivery_products: [
    {
      productCode: { type: String, required: true },
      remarks: { type: String },
      receivedQty: { type: Number, required: true },
      uploadedImages: { type: [String] },
    },
  ],
  pre_delivery_uom: { type: String, required: true },
});

module.exports = mongoose.model("PreDelivery", preDeliverySchema);
