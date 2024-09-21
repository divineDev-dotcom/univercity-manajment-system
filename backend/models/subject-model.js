const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const SubjectSchema = new Schema({
subjectCode: {type: String, required: true, unique: true, trim: true},
subjectName: { type: String, required: true, trim: true },
description: { type: String, required: true, trim: true },
createdBy: {type: ObjectId, ref: "User", required: true},
updatedBy: {type: ObjectId, ref: "User"}
},
{timestamps: true}
);

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;