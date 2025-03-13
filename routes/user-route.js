// packages
const express = require("express");
const router = express.Router();

// controller
const userController = require("../controllers/user-controller");

// user signup
router.post("/signup", userController.signUp);

// user signin
router.post("/signin", userController.signIn);

// get the user guard role list
router.get("", userController.getListGuardRole);

// exports
module.exports = router;
