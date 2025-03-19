// ---- model ----
const HttpError = require("../models/error/http-error");
const Appointment = require("../models/schema/appointment-schema");

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// ---- controllers

// http://localhost:5000/api/appointment/create-appointment - POST
const createAppointment = async (req, res, next) => {
  const {
    appointment_id,
    appointment_date,
    appointment_time,
    carrier_name,
    warehouse_name,
    warehouse_address,
    driver_name,
    helper_name,
    parking_slot,
    dock,
    plate_no,
    activity,
    status,
  } = req.body;

  try {
    const appointment = new Appointment({
      appointment_id,
      appointment_date,
      appointment_time,
      carrier_name,
      warehouse_name,
      warehouse_address,
      driver_name,
      helper_name,
      parking_slot,
      dock,
      plate_no,
      activity,
      status,
    });

    await appointment.save();

    res
      .status(201)
      .json({ message: "Appointment created successfully", appointment });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Failed to create an appointment. Please try again later",
      500
    );
    return next(error);
  }
};

// http://localhost:5000/api/appointment/ - GET
const getAppointment = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();

    // Instead of returning 404, just return an empty array
    res.status(200).json({ appointments });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Failed to retrieve appointment data. Please try again later.",
      500
    );
    return next(error);
  }
};

// http://localhost:5000/api/appointment/:appointment_id/gatepass - GET
const getAppointmentByAppointmentId = async (req, res, next) => {
  const { appointment_id } = req.params; // Extract appointment_id from request params

  console.log(appointment_id);

  try {
    const appointment = await Appointment.findOne({ appointment_id });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Extract the required fields
    const {
      appointment_id: id,
      appointment_date,
      appointment_time,
      dock,
      parking_slot,
      plate_no,
      time_in,
      time_out,
    } = appointment;

    res.status(200).json({
      appointment_id: id,
      appointment_date,
      appointment_time,
      dock,
      parking_slot,
      plate_no,
      time_in,
      time_out,
    });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError(
        "Failed to retrieve appointment data. Please try again later.",
        500
      )
    );
  }
};

// http://localhost:5000/api/appointment/:plate_no - GET appointment list by plate no
const getAppointmentByPlateNo = async (req, res, next) => {
  const { plate_no } = req.params;

  try {
    // query the database for appointments with the given plate number
    const appointments = await Appointment.find({ plate_no });

    // return an empty array if no appointments are found
    res.status(200).json({ appointments });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Failed to retrieve appointment data by plate no. Please try again later.",
      500
    );
    return next(error);
  }
};

// http://localhost:5000/api/appointment/:appointment_id/update-appointment
const updateAppointment = async (req, res, next) => {
  const { appointment_id } = req.params; // Get custom appointment_id from URL
  const {
    appointment_date,
    appointment_time,
    carrier_name,
    warehouse_name,
    warehouse_address,
    driver_name,
    helper_name,
    parking_slot,
    dock,
    plate_no,
    activity,
  } = req.body;

  try {
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { appointment_id }, // Search using appointment_id instead of _id
      {
        appointment_date,
        appointment_time,
        carrier_name,
        warehouse_name,
        warehouse_address,
        driver_name,
        helper_name,
        parking_slot,
        dock,
        plate_no,
        activity,
      },
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return next(new HttpError("Appointment does not exist", 404));
    }

    res.status(200).json({
      message: "Appointment updated successfully",
      updatedAppointment,
    });
  } catch (err) {
    return next(
      new HttpError("Updating appointment failed. Please try again later", 500)
    );
  }
};

// http://localhost:5000/api/appointment/:appointment_id/scan - PATCH - Guard scan
// const updateAppointmentScan = async (req, res, next) => {
//   const { appointment_id } = req.params;

//   try {
//     // Find the appointment by appointment_id
//     const appointment = await Appointment.findOne({ appointment_id });

//     if (!appointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     if (!appointment.time_in) {
//       // First scan: Set time_in, update status to 'In Progress'
//       appointment.time_in = dayjs()
//         .tz("Asia/Manila")
//         .format("YYYY-MM-DD HH:mm:ss");
//       appointment.status = "In Progress";
//     } else if (!appointment.time_out) {
//       // Second scan: Set time_out, mark scanned as true, update status to 'Completed'
//       appointment.time_out = dayjs()
//         .tz("Asia/Manila")
//         .format("YYYY-MM-DD HH:mm:ss");
//       appointment.scanned = true;
//       appointment.status = "Completed";
//     } else {
//       // If both time_in and time_out exist, scanning again does nothing
//       return res.status(200).json({
//         message: "Appointment already scanned completely",
//         appointment,
//       });
//     }

//     await appointment.save(); // Save changes

//     res.status(200).json({
//       message: appointment.time_out
//         ? "Time-out recorded successfully, appointment completed"
//         : "Time-in recorded successfully, appointment in progress",
//       appointment,
//     });
//   } catch (err) {
//     console.error(err);
//     return next(
//       new HttpError(
//         "Failed to update appointment scan. Please try again later.",
//         500
//       )
//     );
//   }
// };

// http://localhost:5000/api/appointment/:appointment_id/time-in - PATCH - Guard scan
const updateTimeIn = async (req, res) => {
  const { appointment_id } = req.params;

  try {
    const appointment = await Appointment.findOne({ appointment_id });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Get today's date in YYYY-MM-DD format
    const today = dayjs().tz("Asia/Manila").format("YYYY-MM-DD");
    const appointmentDate = dayjs(appointment.appointment_date)
      .tz("Asia/Manila")
      .format("YYYY-MM-DD");

    // Check if appointment is scheduled for today
    if (appointmentDate !== today) {
      return res.status(400).json({
        message: "This appointment is not scheduled for today.",
        appointment,
      });
    }

    if (appointment.time_in) {
      return res
        .status(400)
        .json({ message: "Time-in already recorded", appointment });
    }

    appointment.time_in = dayjs()
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
    appointment.status = "In Progress";

    await appointment.save();
    res.status(200).json({ message: "Time-in recorded", appointment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating time-in", error: err.message });
  }
};

// http://localhost:5000/api/appointment/:appointment_id/time-out - PATCH - Guard scan
const updateTimeOut = async (req, res) => {
  const { appointment_id } = req.params;

  try {
    const appointment = await Appointment.findOne({ appointment_id });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (!appointment.time_in) {
      return res
        .status(400)
        .json({ message: "Time-in must be recorded first" });
    }

    if (appointment.time_out) {
      return res
        .status(400)
        .json({ message: "Time-out already recorded", appointment });
    }

    appointment.time_out = dayjs()
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
    appointment.status = "Completed";

    await appointment.save();
    res.status(200).json({ message: "Time-out recorded", appointment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating time-out", error: err.message });
  }
};

// http://localhost:5000/api/appointment/:id/delete-appointment
const deleteAppointment = async (req, res, next) => {
  const apptId = req.params.id;

  try {
    const appointment = await Appointment.findOne({ appointment_id: apptId });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await Appointment.deleteOne({ appointment_id: apptId }); // Correct deletion method
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Failed to delete appointment data. Please try again later.",
      500
    );
    return next(error);
  }
};

// ---- exports ----
exports.createAppointment = createAppointment;
exports.getAppointment = getAppointment;
exports.getAppointmentByAppointmentId = getAppointmentByAppointmentId;
exports.getAppointmentByPlateNo = getAppointmentByPlateNo;
exports.updateAppointment = updateAppointment;
// exports.updateAppointmentScan = updateAppointmentScan;
exports.updateTimeIn = updateTimeIn;
exports.updateTimeOut = updateTimeOut;
exports.deleteAppointment = deleteAppointment;
