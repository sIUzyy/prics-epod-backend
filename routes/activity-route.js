// packages
const express = require("express");
const router = express.Router();

// controller
const activityController = require("../controllers/activity-controller");

// create an activity
router.post("/create-activity", activityController.createActivity);

// get a list of activity
router.get("", activityController.getActivity);

// update an activity by id
router.patch("/:id/update-activity", activityController.updateActivity);

// delete an activity by id
router.delete("/:id/delete-activity", activityController.deleteActivity);

// exports
module.exports = router;
