/*
subjects - subjects taught by the faculty
dateOfJoining: date of hiring
isCurrentlyWorking 
dateOfLeaving - if retired or left job
salary 
a field to point to studentId in case faculty had passed out from the same university
Please see if anything else is required
please remember not to create model here
*/
const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const facultySchema = new Schema({
isWorking: { type: Boolean, required: true, default: false }
});

module.exports = facultySchema;