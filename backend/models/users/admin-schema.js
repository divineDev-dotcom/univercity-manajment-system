/*
Differs from Faculty schema in following 2 things: - association with a department
- array of subjects taught
*/

const mongoose = require("mongoose");
const {Schema, ObjectId, Decimal128} = mongoose;

const adminSchema = new Schema({
employmentStatus: {
type: String,
enum: ["working", "retired", "resigned", "terminated"],
default: "working", required: true, trim: true
},
hireDate: { type: Date, required: true },
dateOfLeaving: { type: Date },
salary: { type: Decimal128, required: true }, // records monthly salary for now
});

module.exports = adminSchema;