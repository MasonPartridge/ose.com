const { body, validationResult } = require("express-validator");
const OSE = require("../models/ose");
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
    res.render('employee_form', {
        employee: {
            first_name: "Enter first name here",
            family_name: "Enter family name here",
            clearance_level: "I"
        },
        is_editing: "false"
    });
});

exports.employee_edit = asyncHandler(async (req, res) => {
    try {
        const employee = await Personal.findOne({ _id: req.params.id }).exec();
        console.log(`time: ${employee.date_of_birth}`);
        res.render('employee_form', {
            employee: employee,
            is_editing: "true"
        });
    } catch (err) {
        res.status(500).send('Error occurred while fetching employee data');
    }
})

exports.employee_delete = [
    body("_id")
        .trim()
        .escape(),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            try {
                await Personal.deleteOne({ _id: req.body._id });
                await OSE.updateMany({ author: _id }, { $set: { author: "649b0093594d57528c146dc8" } })
                res.redirect("/employee-database");
            } catch (err) {
                res.send(500).send('Error occured while deleting employee');
                console.log(err);
            }
        }
    })
]

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
        .optional({ nullable: true }),
    body("date_of_death_field", "Invalid date of death")
        .optional({ nullable: true }),
    body("clearance_level_field"),
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

        const employee = {
            first_name: req.body.first_name_field,
            family_name: req.body.family_name_field,
            date_of_birth: req.body.date_of_birth_field,
            date_of_death: req.body.date_of_death_field,
            clearance_level: req.body.clearance_level_field
        };
        console.log(employee)

        if (!errors.isEmpty()) {
            errors.array().forEach((error) => {
                console.log(error.msg);
            });
            return;
        } else {
            console.log(req.body.date_of_birth_field);
            try {
                if (req.body.is_editing === "true") {
                    await Personal.findOneAndReplace({ _id: req.body._id }, employee)
                } else {
                    await (new Personal(employee)).save();
                }
                res.redirect('/employee-database');
            } catch (err) {
                res.status(500).send('Error occurred while fetching employee data');
                console.log(err);
            }
        }
    })
];

