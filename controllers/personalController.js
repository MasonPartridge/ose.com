const Personal = require("../models/personal");
const asyncHandler = require("express-async-handler");

exports.personal_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: PERSONAL LISTINGS");
});

exports.personal_info = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: PERSONAL INFORMATION FOR ${req.params.id}`);
});

