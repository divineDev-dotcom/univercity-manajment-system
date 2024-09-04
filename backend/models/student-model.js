const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const studentSchema = new Schema({
userName: { type: ObjectId, ref: 'users', required: true },
coursesEnrolled: [{ type: ObjectId, ref: 'courses' }],
attendance: [{
courseId: { type: ObjectId, ref: 'courses', required: true },
attendancePercentage: { type: Number, required: true }
}],
grades: [{
courseId: { type: ObjectId, ref: 'courses', required: true },
grade: { type: String, required: true },
semester: { type: String, required: true }
}],
admissionStatus: { type: String, enum: ['applied', 'admitted', 'enrolled'], required: true },
feesPaid: { type: Boolean, required: true },
hostelAllocated: { type: Boolean, required: true },
createdBy: { type: ObjectId, ref: "User" },
updatedBy: { type: ObjectId, ref: "User" },
}, 
{ timestamps: true }
);

studentSchema.pre('save', function(next) {
this.updatedAt = Date.now();
next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
