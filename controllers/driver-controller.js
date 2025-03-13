// ---- model ----
const HttpError = require("../models/error/http-error");
const Driver = require("../models/schema/driver-schema");

// http://localhost:5000/api/driver/createdriver
const createDriver = async (req, res, next) => {
  const { driver_name, address, license } = req.body;

  try {
    const newDriver = new Driver({
      driverName: driver_name,
      address,
      driverLicense: license,
    });

    await newDriver.save();

    return res
      .status(201)
      .json({ messaeg: "driver created success", driver_data: newDriver });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Failed to create Driver data. Please try again later.",
      500
    );
    return next(error);
  }
};

const getDriverList = async (req, res, next) => {
  try {
    const driver = await Driver.find();

    res.status(200).json({ driver });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Failed to retrieve Driver data. Please try again later.",
      500
    );
    return next(error);
  }
};

// exports
exports.createDriver = createDriver;
exports.getDriverList = getDriverList;
