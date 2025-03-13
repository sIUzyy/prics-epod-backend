const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
  warehouseName: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Warehouse", warehouseSchema);
