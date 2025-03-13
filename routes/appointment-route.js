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

router.patch(
  "/:appointment_id/scan",
  appointmentController.updateAppointmentScan
);

// delete appointment by appointment id
router.delete(
  "/:id/delete-appointment",
  appointmentController.deleteAppointment
);

// exports
module.exports = router;
