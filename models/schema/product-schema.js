const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  trackingNo: { type: String, required: true }, // wms
  productCode: { type: String, required: true, unique: true }, // wms
  description: { type: String, required: true }, // wms
  shippedQty: { type: Number, required: true }, // wms
  total_cbm_per_item: { type: Number, required: true }, // wms
});
module.exports = mongoose.model("Product", productSchema);
