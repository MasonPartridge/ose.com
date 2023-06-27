const express = require("express");
const router = express.Router();

const ose_controller = require("../controllers/oseController");

/// OSE DATABASE ROUTES ///

router.get("/ose-form", ose_controller.ose_form_get);

router.get("/:id", ose_controller.ose_info);

router.get("/", ose_controller.ose_list);

router.get("/edit-form/:id", ose_controller.ose_edit_form);

router.post("/ose-form", ose_controller.ose_form_post);

module.exports = router;