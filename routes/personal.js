const express = require("express");
const router = express.Router();
const personal_controller = require("../controllers/personalController");

/// PERSONAL LISTINGS ROUTES ///

router.get("/", personal_controller.personal_list);

router.get("/:id", personal_controller.personal_info);

module.exports = router;