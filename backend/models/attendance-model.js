const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const attendanceSchema = new Schema({
date: { type: Date, required: true },
userId: { type: ObjectId, ref: "User", required: true },
courseId: { type: ObjectId, ref: "Course", },
subjectId: { type: ObjectId, ref: "subject" },
status: { 
type: String, 
enum: ["present", "absent", "leave"], 
required: true 
},
leaveId: { type: ObjectId, ref: "Leave" },
createdBy: { type: ObjectId, ref: "User", required: true },
updatedBy: { type: ObjectId, ref: "User" }
}, 
{timestamps: true} // Automatically adds createdAt and updatedAt fields
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;