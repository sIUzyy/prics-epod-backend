const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  appointment_id: { type: String, required: true, unique: true }, // epod
  appointment_date: { type: Date, required: true }, // epod
  appointment_time: { type: String, required: true }, // epod
  carrier_name: { type: String, required: true }, // epod
  warehouse_name: { type: String, required: true }, // epod
  warehouse_address: { type: String, required: true }, // epod
  driver_name: { type: String, required: true }, // epod
  helper_name: { type: String, required: true }, // epod
  parking_slot: { type: String, required: true }, // epod
  dock: { type: String, required: true }, // epod
  plate_no: { type: String, required: true }, // wms
  activity: { type: String, required: true }, // epod
  status: { type: String, required: true }, // epod
  time_in: { type: String, default: null }, // epod
  time_out: { type: String, default: null }, // epod
});

module.exports = mongoose.model("Appointment", appointmentSchema);
