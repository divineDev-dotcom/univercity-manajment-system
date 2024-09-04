// model: Student
// it takes reference of userName from user model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
userName: { type: Schema.Types.ObjectId, ref: 'users', required: true },
: { type: String, required: true, unique: true },
coursesEnrolled: [{ type: Schema.Types.ObjectId, ref: 'courses' }],
attendance: [{
courseId: { type: Schema.Types.ObjectId, ref: 'courses', required: true },
attendancePercentage: { type: Number, required: true }
}],
grades: [{
    courseId: { type: Schema.Types.ObjectId, ref: 'courses', required: true },
grade: { type: String, required: true },
semester: { type: String, required: true }
}],
admissionStatus: { type: String, enum: ['applied', 'admitted', 'enrolled'], required: true },
feesPaid: { type: Boolean, required: true },
hostelAllocated: { type: Boolean, required: true },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now }
});

studentSchema.pre('save', function(next) {
this.updatedAt = Date.now();
next();
});

const Student = mongoose.model('students', studentSchema);

module.exports = Student;
