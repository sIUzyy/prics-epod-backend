const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
  warehouseName: { type: String, required: true }, // wms
  address: { type: String, required: true }, // wms
});

module.exports = mongoose.model("Warehouse", warehouseSchema);
