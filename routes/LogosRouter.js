const express = require("express");
const router = express.Router();
const LogoController = require("../controllers/LogoController");

router.post("/new", LogoController.generateLogoImage);
router.get("/:id/", LogoController.getJobStatus);
router.delete("/:id", LogoController.deleteLogo);

module.exports = router;
