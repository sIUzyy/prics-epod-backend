const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// SCHEMA WHEN USER SCAN THE TRACKING NO.
const preDeliverySchema = new Schema({
  pre_delivery_trackingNo: { type: String, required: true }, // wms
  pre_delivery_loadNo: { type: String, required: true }, // wms
  pre_delivery_receivedDate: { type: Date, required: true }, // epod
  pre_delivery_receivedBy: { type: String, required: true }, // epod
  pre_delivery_products: [
    {
      productCode: { type: String, required: true }, // wms
      remarks: { type: String }, // epod
      receivedQty: { type: Number, required: true }, // epod
      uploadedImages: { type: [String] }, // epod
    },
  ],
  pre_delivery_uom: { type: String, required: true }, // wms
});

module.exports = mongoose.model("PreDelivery", preDeliverySchema);
