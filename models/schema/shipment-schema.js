const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
  trackingNo: { type: String, required: true, unique: true }, // wms
  customerName: { type: String, required: true }, // wms
  address: { type: String, required: true }, // wms
  loadNo: { type: String, required: true }, // wms
  uom: { type: String, required: true }, // wms
  shippedDate: { type: Date, required: true }, // wms
  waybillNo: { type: String, required: true }, // wms
  cvNo: { type: String, required: true }, // wms
  plateNo: { type: String, required: true }, // wms
  driverName: { type: String, required: true }, // wms
  status: { type: String, required: true }, // wms
  epodStatus: { type: String, required: true }, // epod
  productCodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // wms
  priority: { type: Number, default: null }, // epod
  createdAt: { type: Date, default: Date.now }, // epod
});

module.exports = mongoose.model("Shipment", shipmentSchema);
