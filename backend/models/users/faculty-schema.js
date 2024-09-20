/*
This faculty model is being used as discriminator of the User model.
*/
const mongoose = require("mongoose");
const {Schema, ObjectId, Decimal128} = mongoose;

const facultySchema = new Schema({
isWorking: { type: Boolean, default: true, required: true },
dateOfJoining: { type: Date, required: true },
dateOfLeaving: { type: Date },
salary: { type: Decimal128, required: true }, // records monthly salary for now
subjects: [{ type: ObjectId, ref: "Subject" }],
isAlumni: { type: Boolean, default: false, required: true } // informs if faculty is ex student of this university
});

module.exports = facultySchema;