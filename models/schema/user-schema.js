const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: { type: String, enum: ["admin", "guard"], required: true }, // wms(admin) / epod(guard)
  name: { type: String }, // epod(guard)
  username: { type: String, required: true, unique: true }, // wms(admin) / epod(guard)
  password: { type: String, required: true }, // wms(admin) / epod(guard)
});

module.exports = mongoose.model("User", userSchema);
