const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  driverName: { type: String, required: true },
  address: { type: String, required: true },
  driverLicense: { type: String, require: true },
});

module.exports = mongoose.model("Driver", driverSchema);
