// ---- model ----
const HttpError = require("../models/error/http-error");
const Activity = require("../models/schema/activity-schema");

// ---- controller ----

// http://localhost:5000/api/activity/create-activity - POST
const createActivity = async (req, res, next) => {
  const { activity_name, description } = req.body;

  try {
    const newActivity = new Activity({
      activityName: activity_name,
      description,
    });

    await newActivity.save();

    return res.status(201).json({
      message: "Successfully creating an activity",
      activity: newActivity,
    });
  } catch (err) {
    const error = new HttpError(
      "Failed to create activity. Please try again later.",
      500
    );
    return next(error);
  }
};

// http://localhost:5000/api/activity - GET
const getActivity = async (req, res, next) => {
  try {
    const activity = await Activity.find();

    res.status(200).json({ activity });
  } catch (err) {
    const error = new HttpError(
      "Failed to retrieve activity list. Please try again later.",
      500
    );
    return next(error);
  }
};

// http://localhost:5000/api/activity/:id/update-activity - PATCH
const updateActivity = async (req, res, next) => {
  const activityId = req.params.id;
  const { activity_name, description } = req.body;

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      { activityName: activity_name, description },
      { new: true, runValidators: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({
      message: "Activity updated successfully",
      activity: updatedActivity,
    });
  } catch (err) {
    const error = new HttpError(
      "Failed to update activity. Please try again later.",
      500
    );
    return next(error);
  }
};

// http://localhost:5000/api/activity/:id/delete-activity - DELETE
const deleteActivity = async (req, res, next) => {
  try {
    const activityId = req.params.id;
    const deleteActivity = await Activity.findByIdAndDelete(activityId);

    if (!deleteActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting activity", error: error.message });
  }
};

// exports
exports.createActivity = createActivity;
exports.getActivity = getActivity;
exports.updateActivity = updateActivity;
exports.deleteActivity = deleteActivity;
