const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const userValidation = require("../requests/UserRequest.js");

router.post("/login", userController.loginPost, userValidation.loginValidation);
router.post("/create", userController.registerPost, userValidation.createUser);

module.exports = router;
