// packages
const express = require("express");
const router = express.Router();

// controller
const appointmentController = require("../controllers/appointment-controller");

// create an appointment
router.post("/create-appointment", appointmentController.createAppointment);

// get all appointment
router.get("", appointmentController.getAppointment);

// get appointment by appointment id - security
router.get(
  "/:appointment_id/gatepass",
  appointmentController.getAppointmentByAppointmentId
);

// get the appointment by plate no
router.get("/:plate_no", appointmentController.getAppointmentByPlateNo);

// update appointment by appointment id
router.patch(
  "/:appointment_id/update-appointment",
  appointmentController.updateAppointment
);

// scan the gatepass - security guard
// router.patch(
//   "/:appointment_id/scan",
//   appointmentController.updateAppointmentScan
// );

// scan the gatepass - security guard
router.patch("/:appointment_id/time-in", appointmentController.updateTimeIn);

// scan the gatepass - security guard
router.patch("/:appointment_id/time-out", appointmentController.updateTimeOut);

// delete appointment by appointment id
router.delete(
  "/:id/delete-appointment",
  appointmentController.deleteAppointment
);

// exports
module.exports = router;
