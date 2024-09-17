const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const applicantSchema = new Schema({
courseId: { type: ObjectId, ref: "Course", required: true },
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

module.exports = applicantSchema;