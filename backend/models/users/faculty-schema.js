/*
This faculty model is being used as discriminator of the User model.
I have added a scenario if the user becomes faculty of the university. But there is one concern that has to be addressed here.
If the user wants to use the same email, it will not be allowed. In such case, we might have to move the student details to history, which can be a field in this schema or an entire new schema.
*/

const mongoose = require("mongoose");
const {Schema, ObjectId, Decimal128} = mongoose;

const facultySchema = new Schema({
employmentStatus: {
type: String,
enum: ["working", "retired", "resigned", "terminated"],
required: true, trim: true
},
departmentId: { type: ObjectId, required: true },
hireDate: { type: Date, required: true },
dateOfLeaving: { type: Date },
salary: { type: Decimal128, required: true }, // records monthly salary for now
subjects: [{ type: ObjectId, ref: "Subject" }]
});

module.exports = facultySchema;