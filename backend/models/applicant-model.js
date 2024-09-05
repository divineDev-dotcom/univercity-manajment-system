const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const applicantSchema = new Schema({
studentId: { type: ObjectId, ref: "Student", required: true },
courseId: { type: ObjectId, ref: "Course", required: true },
applicationNumber: { type: String, required: true, unique: true, trim: true },
documentsSubmitted: [{ type: String, trim: true }],
status: { 
type: String, 
enum: ["submitted", "under review", "accepted", "rejected"], 
required: true 
},
hollTicketIssued: { type: Boolean, default: false },
createdBy: { type: ObjectId, ref: "User" },
updatedBy: { type: ObjectId, ref: "User" }
}, 
{ timestamps: true }
);

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = applicant;
