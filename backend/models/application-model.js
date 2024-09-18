/*
Application model is linked to the student model. 
When a candidate applies for course, Student document is created which points to this model.
This model will contain the entire information of an application.
A student can apply for several courses during his career path, so there will be 1 student user which will point to this application for the courses he/she ever applied to.
In this way, the history of applications will be maintained.
Whenever required, the details of corresponding application can be pulled out using applicationId key stored in the student schema.
*/
const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const applicationSchema = new Schema({
applicationNumber: { type: String, required: true, unique: true, trim: true },
documentsSubmitted: [{ 
documentType: { type: String, trim: true },
documentURL: { type: String, trim: true }
}],
status: { 
type: String, 
enum: ["submitted", "under review", "accepted", "rejected"], 
required: true 
},
admitCardURL: { type: String, trim: true }
});

module.exports = applicationSchema;