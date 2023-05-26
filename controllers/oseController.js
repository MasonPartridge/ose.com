const Personal = require("../models/ose");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
})

exports.ose_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: OSE LISTINGS");
});

exports.ose_info = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: INFORMATION FOR ${req.params.id}`);
});
