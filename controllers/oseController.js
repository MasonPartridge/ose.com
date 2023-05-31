const { body, validationResult } = require("express-validator");
const OSE = require("../models/ose");
const Personal = require("../models/employee");
const asyncHandler = require("express-async-handler");

exports.ose_list = asyncHandler(async (req, res) => {

    Promise.all([
        OSE.countDocuments({}).exec(),
        OSE.find({}, "anonomoly_id_number author")
            .sort({ anonomoly_id_number: 1 })
            .populate("author")
            .exec()
    ]).then(([oseCount, allOSE]) => {
        res.render('ose-database', {
            ose_count: oseCount,
            all_ose: allOSE
        });
    }).catch(err => {
        res.status(500).send('Error occurred while fetching OSE data');
    });

});

exports.ose_info = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: INFORMATION FOR ${req.params.id}`);
});

exports.ose_form_get = asyncHandler(async (req, res) => {
    try {
        const personal = await Personal.find({}, "first_name family_name")
            .sort({ first_name: 1 })
            .exec();           
        res.render('ose_form', {
            authors: personal
        });
    } catch (err)  {
        res.status(500).send('Error occurred while fetching Personal data');
    }
});
