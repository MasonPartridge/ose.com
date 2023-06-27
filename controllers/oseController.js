const { body, validationResult } = require("express-validator");
const OSE = require("../models/ose");
const Personal = require("../models/employee");
const asyncHandler = require("express-async-handler");
const ose = require("../models/ose");

exports.ose_list = asyncHandler(async (req, res) => {

    Promise.all([
        OSE.countDocuments({}).exec(),
        OSE.find({}, "anonomoly_id_number author")
            .sort({ anonomoly_id_number: 1 })
            .populate("author")
            .exec()
    ]).then(([oseCount, allOSE]) => {
        res.render('index', {
            ose_count: oseCount,
            all_ose: allOSE,
            inputPage: './ose-database.ejs'
        });
    }).catch(err => {
        console.error('Error retrieving OSE document:', error);
        res.status(500).send('Error occurred while fetching OSE data');
    });

});

exports.ose_info = asyncHandler(async (req, res, next) => {
    try {
        const ose = await OSE.findOne({ _id: req.params.id })
            .populate("author").exec();
        res.render('index', {
            inputPage: './ose-information.ejs',
            ose: ose
        });
    } catch (err) {
        res.status(500).send('Error occurred while fetching OSE data');
    }
});

exports.ose_form_get = asyncHandler(async (req, res) => {
    try {
        const personal = await Personal.find({}, "first_name family_name")
            .sort({ first_name: 1 })
            .exec();
        res.render('ose_form', {
            authors: personal,
            ose: {
                anonomoly_id_number: 0,
                author: personal[0]._id,
                object_class: 'TETH',
                special_containment_procedures: 'Enter OSE special containment procedures',
                description: 'Enter OSE description',
                _id: "null"
            },
            is_editing: false
        });
    } catch (err) {
        res.status(500).send('Error occurred while fetching Personal data');
    }
});

exports.ose_edit_form = asyncHandler(async (req, res) => {
    console.log(`req id: ${req.params.id}`);
    Promise.all([
        OSE.findOne({ _id: req.params.id })
            .exec(),
        Personal.find({}, "first_name family_name")
            .sort({ first_name: 1 })
            .exec()
    ]).then(([ose, personal]) => {
        if (!ose) {
            res.status(404).send('OSE document not found');
            return;
        } else {
            console.log(`ose: ${ose}, employee: ${personal}`);
            res.render('ose_form', {
                authors: personal,
                ose: ose,
                is_editing: true
            });
        }
    }).catch((err) => {
        res.status(500).send('Error occurred while fetching OSE data');
    })
})

exports.ose_form_post = [
    body("anonomoly_id_number_field", "Invalid Number"),
    body("author_field", "Invalid Name"),
    body("object_class_field"),
    body("special_containment_procedures_field")
        .optional({ nullable: true })
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Invalid input."),
    body("description_field")
        .optional({ nullable: true })
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Invalid input."),
    body("is_editing")
        .trim()
        .isBoolean()
        .escape()
        .withMessage("Invalid non boolean input"),
    body("_id", "Invalid input")
        .trim()
        .escape(),

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        const ose = new OSE({
            anonomoly_id_number: req.body.anonomoly_id_number_field,
            author: req.body.author_field,
            object_class: req.body.object_class_field,
            special_containment_procedures: req.body.special_containment_procedures_field,
            description: req.body.description_field
        })

        if (!errors.isEmpty()) {
            try {
                const personal = await Personal.find({}, "first_name family_name")
                    .sort({ first_name: 1 })
                    .exec();
                res.render('ose_form', {
                    authors: personal
                });
            } catch (err) {
                res.status(500).send('Error occurred while fetching Personal data');
            }
        } else {
            try {
                if (req.body.is_editing) {
                    await ose.save();
                } else {
                    await OSE.findOneAndReplace({ _id: req.body._id }, ose)
                }
                res.redirect('/ose-database');
            } catch (err) {
                res.status(500).send('Error occurred while fetching OSE data');
                console.log(err);
            }
        }
    })
]

