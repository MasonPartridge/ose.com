const Personal = require("../models/personal");
const asyncHandler = require("express-async-handler");

exports.personal_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: PERSONAL LISTINGS");
});

exports.personal_info = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: PERSONAL INFORMATION FOR ${req.params.id}`);
});

exports.employee_form_get = asyncHandler(async (req, res) => {
    res.render('employee_form');
})