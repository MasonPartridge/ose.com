const express = require("express");
const router = express.Router();
const personal_controller = require("../controllers/employeeController");

/// PERSONAL LISTINGS ROUTES ///

router.get("/", personal_controller.personal_list);

router.get("/employee-form", personal_controller.employee_form_get);

router.get("/edit-form/:id", personal_controller.employee_edit);

router.get("employee-delete", personal_controller.employee_delete);

router.get("/:id", personal_controller.employee_info);

router.post("/employee-form", personal_controller.employee_form_post);

module.exports = router;