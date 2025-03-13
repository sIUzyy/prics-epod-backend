const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: { type: String, enum: ["admin", "guard"], required: true },
  name: { type: String }, // Required for admins/guards
  username: { type: String, required: true, unique: true }, // Required for admins/guards
  password: { type: String, required: true }, // Required for authentication
});

module.exports = mongoose.model("User", userSchema);
