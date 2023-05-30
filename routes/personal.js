const express = require("express");
const router = express.Router();
const personal_controller = require("../controllers/personalController");

/// PERSONAL LISTINGS ROUTES ///

router.get("/", personal_controller.personal_list);

router.get("/employee-form", personal_controller.employee_form_get);

router.get("/view/:id", personal_controller.personal_info);

router.post("/employee-form", personal_controller.employee_form_post);

module.exports = router;