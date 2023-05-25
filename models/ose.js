const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const oseSchema = new Schema({
    anonomoly_id_number: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    object_class: { type: String, enum: ["ZAYIN", "TETH", "HE", "WAW", "ALEPH"]},
    special_containment_procedures: { type: String, required: true },
    description: { type: String, required: true }
    // TODO: Add an array that can contain Addendums
})

oseSchema.virtual("url").get(function() {
    return `/database/ose/${this._id}`;
})

module.exports = mongoose.model("OSE", oseSchema);