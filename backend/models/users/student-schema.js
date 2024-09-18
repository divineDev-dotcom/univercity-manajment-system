/*
The student schema is the common schema for the candidate who applies for the course and finally gets selected or rejected.
It has admission number that will remain the same for all courses, as the student may enroll for bachelors, then masters, and finally PHD.
Thus it has a course array that contains object representing each course undertaken with status: "applied", "ongoing", "completed", "left", and "rejected".
It points to Application collection which contains documents submitted at the time of applying and the admit card.
The course array will maintain the entire history of the candidate, which can be queried for various reports.
The grades will be recorded in separate collection called grades.
*/
const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const studentSchema = new Schema({
admissionNumber: { type: String, trim: true },
courses: [{
applicationId: { type: ObjectId, ref: "Application", required: true },
courseId: { type: ObjectId, ref: "Course", required: true },
departmentId: { type: ObjectId, ref: "Department", required: true },
status: {
type: String,
enum: ["applied", "ongoing", "completed", "left", "rejected"],
default: "applied",
required: true, trim: true
},
currentSemester: { type: Number },
startDate: { type: Date },
endDate: { type: Date }
}],
});

module.exports = studentSchema;