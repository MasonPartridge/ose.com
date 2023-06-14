const { body, validationResult } = require("express-validator");
const Personal = require("../models/employee");
const asyncHandler = require("express-async-handler");

exports.personal_list = asyncHandler(async (req, res, next) => {
    Promise.all([
        Personal.countDocuments({}).exec(),
        Personal.find({}).exec()
    ]).then(([employeeCount, allEmployees]) => {
        res.render('index', {
            inputPage: './employee-database',
            employee_count: employeeCount,
            all_employee: allEmployees
        })
    }).catch(err => {
        res.status(500).send('Error occurred while fetching OSE data');
    });
});

exports.employee_info = asyncHandler(async (req, res) => {
    try {
        const employee = await Personal.findOne({ _id: req.params.id }).exec();
        res.render('index', {
            inputPage: './employee-personal-file.ejs',
            employee: employee
        });
    } catch (err) {
        res.status(500).send('Error occurred while fetching employee data');
    }
});

exports.employee_form_get = asyncHandler(async (req, res) => {
    res.render('employee_form');
});

exports.employee_form_post = [
    body("first_name_field")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Invalid input.")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters"),
    body("family_name_field")
        .optional({ nullable: true })
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Invalid input.")
        .isAlphanumeric()
        .withMessage("Family name has non-alphanumeric characters."),
    body("date_of_birth_field", "Invalid date of birth")
        .optional({ nullable: true })
        .isISO8601()
        .toDate(),
    body("date_of_death_field", "Invalid date of death")
        .optional({ nullable: true })
        .isISO8601()
        .toDate(),
    body("clearance_level_field"),

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        const employee = new Personal({
            first_name: req.body.first_name_field,
            family_name: req.body.family_name_field,
            date_of_birth: req.body.date_of_birth_field,
            date_of_death: req.body.date_of_death_field,
            clearance_level: req.body.clearance_level_field
        });

        if (!errors.isEmpty()) {
            res.render("author_form");
            return;
        } else {
            await employee.save();
            res.redirect('/personal');
        }
    })
];

