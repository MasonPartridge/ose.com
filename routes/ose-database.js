const express = require("express");
const router = express.Router();

const ose_controller = require("../controllers/oseController");
const personal_controller = require("../controllers/personalController");

/// OSE DATABASE ROUTES ///

router.get("/", ose_controller.index);

router.get("/ose-database/:id", ose_controller.ose_info);

router.get("/ose-database", ose_controller.ose_list);

/// PERSONAL LISTINGS ROUTES ///

router.get("/personal", personal_controller.personal_list);

router.get("/personal/:id", personal_controller.personal_info);

module.exports = router;