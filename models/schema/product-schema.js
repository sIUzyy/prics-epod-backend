const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  trackingNo: { type: String, required: true }, // Add this field
  productCode: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shippedQty: { type: Number, required: true },
  total_cbm_per_item: { type: Number, required: true },
});
module.exports = mongoose.model("Product", productSchema);
