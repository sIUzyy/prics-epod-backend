const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  driverName: { type: String, required: true }, // wms
  address: { type: String, required: true }, // wms
  driverLicense: { type: String, require: true }, // wms
});

module.exports = mongoose.model("Driver", driverSchema);
