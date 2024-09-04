const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const admissionSchema = new Schema({
studentId: { type: ObjectId, ref: "Student", required: true },
courseId: { type: ObjectId, ref: "Course", required: true },
applicationNumber: { type: String, required: true, unique: true, trim: true },
documentsSubmitted: [{ type: String, trim: true }],
status: { 
type: String, 
enum: ["submitted", "under review", "accepted", "rejected"], 
required: true 
},
admitCardIssued: { type: Boolean, default: false },
createdBy: { type: ObjectId, ref: "User" },
updatedBy: { type: ObjectId, ref: "User" }
}, 
{ timestamps: true }
);

const Admission = mongoose.model("Admission", admissionSchema);

module.exports = Admission;
