const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    first_name: { type: String, required: true },
    family_name: { type: String },
    date_of_birth: { type: String },
    date_of_death: { type: String },
    clearance_level: {
        type: String,
        enum: ["I", "II", "III", "IV", "V"],
        required: true
    }
});

EmployeeSchema.virtual("url").get(function () {
    return `/database/personal/${this.id}`;
});

module.exports = mongoose.model("Personal", EmployeeSchema);