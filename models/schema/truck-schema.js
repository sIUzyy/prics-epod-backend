const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const truckSchema = new Schema({
  truckModel: { type: String, required: true }, // wms
  // weightCapacity: { type: Number, required: true },
  truckPlateNo: { type: String, required: true }, // wms
});

module.exports = mongoose.model("Truck", truckSchema);
