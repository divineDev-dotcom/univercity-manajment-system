const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const CourseSchema = new Schema({
courseCode: { type: String, required: true, unique: true, trim: true },
departmentId: { type: ObjectId, ref: "Department", required: true },
numberOfSemesters: { type: Number, required: true, min: 1 },
semesters: [{
semesterNumber: { type: Number, required: true },
coreSubjects: [{ type: ObjectId, ref: "Subject", required: true }],
electiveSubjects: [{ type: ObjectId, ref: "Subject", required: true }]
}],
createdBy: { type: ObjectId, ref: "User", required: true },
updatedBy: { type: ObjectId, ref: "User" }
}, 
{timestamps: true}
);

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;