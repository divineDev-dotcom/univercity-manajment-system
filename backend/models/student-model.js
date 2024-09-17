const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const studentSchema = new Schema({
userId: { type: ObjectId, ref: 'users', required: true },
coursesEnrolled: [{ type: ObjectId, ref: 'courses' }],
grades: [{
courseId: { type: ObjectId, ref: 'courses', required: true },
grade: { type: String, required: true },
semester: { type: String, required: true }
}],
admissionStatus: { type: String, enum: ['applied', 'admitted', 'enrolled'], required: true },
hostelAllocated: { type: Boolean, required: true },
createdBy: { type: ObjectId, ref: "User" },
updatedBy: { type: ObjectId, ref: "User" },
}, 
{ timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
