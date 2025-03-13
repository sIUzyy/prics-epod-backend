// ---- model ----
const HttpError = require("../models/error/http-error");
const Warehouse = require("../models/schema/warehouse-schema");

// ---- controller ----

// http://localhost:5000/api/warehouse/createwarehouse - POST - create a warehouse list
const createWarehouse = async (req, res, next) => {
  const { warehouse, address } = req.body;

  try {
    const newWarehouse = new Warehouse({
      warehouseName: warehouse,
      address,
    });

    await newWarehouse.save();

    return res.status(201).json({
      message: "Successfully creating a warehouse list",
      warehouse_data: newWarehouse,
    });
  } catch (err) {
    const error = new HttpError(
      "Failed to create warehouse list. Please try again later.",
      500
    );
    return next(error);
  }
};

// http://localhost:5000/api/warehouse/ - GET - all warehouse list
const getWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.find();

    res.status(200).json({ warehouse });
  } catch (err) {
    const error = new HttpError(
      "Failed to retrieve warehouse list. Please try again later.",
      500
    );
    return next(error);
  }
};

// exports
exports.createWarehouse = createWarehouse;
exports.getWarehouse = getWarehouse;
