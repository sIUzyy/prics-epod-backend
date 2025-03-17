// ---- model ----
const HttpError = require("../models/error/http-error");
const User = require("../models/schema/user-schema");
const Shipment = require("../models/schema/shipment-schema");
const Truck = require("../models/schema/truck-schema");

// ---- bcrypt (hashing password) ----
const bcrypt = require("bcryptjs");

// -- controllers --

// http://localhost:5000/api/user/signup - POST - create an account
const signUp = async (req, res, next) => {
  const { name, username, password, role } = req.body;

  let hashedPassword;

  // hash the password using bycrypt
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );

    return next(error);
  }

  try {
    // create a data to pass in user collection
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      name,
    });

    // save to user collection
    await newUser.save();

    // success
    return res
      .status(201)
      .json({ message: "User created successfully", user: { username, name } });
  } catch (err) {
    const error = new HttpError(
      "An unexpected error occur. Failed to save token",
      500
    );
    return next(error);
  }
};

// http://localhost:5000/api/user/signin - POST
const signIn = async (req, res, next) => {
  try {
    const { username, password, name, plate_number } = req.body;

    // Admin and Security Credential Check
    if (username && password) {
      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username, could not log you in." });
      }

      // compare password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res
          .status(401)
          .json({ message: "Invalid password, could not log you in." });
      }

      // Success
      return res.status(200).json({
        message: "Login successful",
        name: user.name,
        username: user.username,
        role: user.role,
      });
    }

    // Driver Credential Check
    if (name && plate_number) {
      // Check if the truck exists with the given plate number
      const truck = await Truck.findOne({ truckPlateNo: plate_number });

      if (!truck) {
        return res.status(401).json({
          message: "Invalid plate number. No truck found.",
        });
      }

      // Find shipments that match the truck's plate number
      const shipments = await Shipment.find({
        plateNo: truck.truckPlateNo,
      }).populate({
        path: "productCodes",
        model: "Product",
      });

      return res.status(200).json({
        message: "Login successful",
        role: "driver",
        shipments, // Return shipments (empty if none found)
      });
    }

    return res
      .status(400)
      .json({ message: "Invalid request. Missing credentials." });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError(
        "An unexpected error occurred. Please try again later.",
        500
      )
    );
  }
};

// http://localhost:5000/api/user - GET - list of guard account
const getListGuardRole = async (req, res, next) => {
  try {
    // Find users with the role "guard"
    const guards = await User.find({ role: "guard" }).select("-password");

    return res.status(200).json({ guards }); // Always return 200, even if the list is empty
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Fetching to retrieve guards data. Please try again.", 500)
    );
  }
};

// http:localhost:5000/api/user/:id/delete-account - DELETE (guard account)
const deleteGuardById = async (req, res) => {
  try {
    const guardId = req.params.id;
    const deletedGuard = await User.findByIdAndDelete(guardId);

    if (!deletedGuard) {
      return res.status(404).json({ message: "Guard not found" });
    }

    res.status(200).json({ message: "Guard deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting guard", error: error.message });
  }
};

// ---- exports ----
exports.signIn = signIn;
exports.signUp = signUp;
exports.getListGuardRole = getListGuardRole;
exports.deleteGuardById = deleteGuardById;
