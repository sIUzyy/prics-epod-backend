// ---- model ----
const HttpError = require("../models/error/http-error");
const Truck = require("../models/schema/truck-schema");

// ---- controllers ----

// http:localhost:5000/api/truck/createtruck
const createtruck = async (req, res, next) => {
  const { truck_model, weight_capacity, plate_no } = req.body;

  try {
    const newTruck = new Truck({
      truckModel: truck_model,
      weightCapacity: weight_capacity,
      truckPlateNo: plate_no,
    });

    await newTruck.save();

    return res
      .status(201)
      .json({
        message: "Truck list  created successfully",
        truck_data: newTruck,
      });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Failed to create Truck data. Please try again later.",
      500
    );
    return next(error);
  }
};

const getTruckList = async (req, res, next) => {
  try {
    const truck = await Truck.find();

    res.status(200).json({ truck });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Failed to retrieve Truck data. Please try again later.",
      500
    );
    return next(error);
  }
};

// exports
exports.createtruck = createtruck;
exports.getTruckList = getTruckList;
