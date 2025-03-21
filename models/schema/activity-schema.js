const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  activityName: { type: String, required: true }, // epod
  description: { type: String }, // epod
});

module.exports = mongoose.model("Activity", activitySchema);
