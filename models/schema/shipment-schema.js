const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
  trackingNo: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  loadNo: { type: String, required: true },
  uom: { type: String, required: true },
  shippedDate: { type: Date, required: true },
  waybillNo: { type: String, required: true },
  cvNo: { type: String, required: true },
  plateNo: { type: String, required: true },
  driverName: { type: String, required: true },
  status: { type: String, required: true },
  epodStatus: { type: String, required: true },
  productCodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Can be empty initially
  priority: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Shipment", shipmentSchema);
