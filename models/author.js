const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, required: true },
    family_name: { type: String, required: true },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
    clearance_level: { type: String, enum: [ "I", "II", "III", "IV", "V"] }
});

AuthorSchema.virtual("url").get(function () {
    return `/catalog/author/${this.id}`;
});

module.exports = mongoose.model("Author", AuthorSchema);