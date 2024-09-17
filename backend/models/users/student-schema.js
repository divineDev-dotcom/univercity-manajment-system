/*
enrollmentNumber of student
dateOfEnrollment
courseId - id of course student is enrolled in
semesterNumber - current semester number of student
electivesOpted: array of subjectId
grades: see how we can incorporate grades for each semester here
whosoever is creating schema can see if any other field is needed
Please remember we do not have to create model here
*/
const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const studentSchema = new Schema({
enrollmentNumber: {type: String, required: true},
courseId: {type: ObjectId, required: true}
});

module.exports = studentSchema;