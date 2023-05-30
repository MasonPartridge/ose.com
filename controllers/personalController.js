const { body, validationResult } = require("express-validator");
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

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        const employee = new Personal({
            first_name: req.body.first_name_field,
            family_name: req.body.family_name_field,
            date_of_birth: req.body.date_of_birth_field,
            date_of_death: req.body.date_of_death_field
        });

        if (!errors.isEmpty()) {
            res.render("author_form");
            return;
        } else {
            await employee.save();
            res.redirect('/');
        }
    })
];
