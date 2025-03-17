const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  activityName: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Activity", activitySchema);
