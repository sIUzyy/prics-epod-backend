const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  appointment_id: { type: String, required: true, unique: true },
  appointment_date: { type: Date, required: true },
  appointment_time: { type: String, required: true },
  carrier_name: { type: String, required: true },
  driver_name: { type: String, required: true },
  helper_name: { type: String, required: true },
  parking_slot: { type: String, required: true },
  dock: { type: String, required: true },
  plate_no: { type: String, required: true },
  status: { type: String, required: true },
  time_in: { type: String, default: null },
  time_out: { type: String, default: null },
  scanned: { type: Boolean, default: false }, // security scanned
});

module.exports = mongoose.model("Appointment", appointmentSchema);
