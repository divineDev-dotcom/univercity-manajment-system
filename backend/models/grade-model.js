/*
this grade schema contains the grade for each subject that the student has enrolled for.
We can enhance this grade schema to have marks/percentages for mid term, finals, etc. in an array. 
and the grade field will store the consolidated grade for that subject.
*/
const mongoose = require("mongoose");
const {Schema, ObjectId}  = mongoose;

const gradeSchema = new Schema({
userId: { type: ObjectId, ref: "User", required: true },
courseId: { type: ObjectId, ref: "Course", required: true },
semesterNumber: { type: Number, required: true },
subjectId: { type: ObjectId, required: true },
status: {
type: String,
enum: ["ongoing", "passed", "failed", "left"],
default: "ongoing",
required: true, trim: true
},
grade: {
type: String,
enum: ["A+", "A", "B+", "B", "C", "D", "F"],
trim: true
},
createdBy: { type: ObjectId, ref: "User", required: true },
updatedBy: { type: ObjectId, ref: "User" }
}, 
{ timestamps: true }
);

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;