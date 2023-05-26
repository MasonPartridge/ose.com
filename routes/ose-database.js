const express = require("express");
const router = express.Router();

const ose_controller = require("../controllers/oseController");

/// OSE DATABASE ROUTES ///

router.get("/:id", ose_controller.ose_info);

router.get("/", ose_controller.ose_list);

module.exports = router;