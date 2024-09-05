const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const attendanceSchema = new Schema({
userId: { 
type: ObjectId, 
ref: 'User', 
required: true 
},
userType: { 
type: String, 
enum: ['student', 'faculty'], 
required: true 
},
courseId: { 
type: ObjectId, 
ref: 'Course', 
},
date: { 
type: Date, 
required: true 
},
status: { 
type: String, 
enum: ['present', 'absent'], 
required: true 
},
createdBy: { 
type: ObjectId, 
ref: 'User', 
},
updatedBy: { 
type: ObjectId, 
ref: 'User', 
}
}, 
{timestamps: true} // Automatically adds createdAt and updatedAt fields
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
