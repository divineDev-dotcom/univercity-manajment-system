/* Module: Student Schema
Description: defines the Mongoose schema for the "Student" collection
schema includes references to related collections such as User, Department, and Course. 
The schema automatically updates the updatedAt field whenever a student document is saved.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
userId: {
type: Schema.Types.ObjectId,
ref: 'User',
required: true
},
enrollmentNumber: {
type: String,
required: true,
unique: true
},
departmentId: {
type: Schema.Types.ObjectId,
ref: 'Department',
required: true
},
coursesEnrolled: [
{
type: Schema.Types.ObjectId,
ref: 'Course'
}
],
attendance: [
{
courseId: {
type: Schema.Types.ObjectId,
ref: 'Course'
},
attendancePercentage: {
type: Number,
min: 0,
max: 100
}
}
],
grades: [
{
courseId: {
type: Schema.Types.ObjectId,
ref: 'Course'
},
grade: {
type: String,
enum: ['A', 'B', 'C', 'D', 'F'], // Example grade scale
required: true
},
semester: {
type: Number,
required: true
}
}
],
admissionStatus: {
type: String,
enum: ['applied', 'admitted', 'enrolled'],
required: true
},
feesPaid: {
type: Boolean,
default: false
},
hostelAllocated: {
type: Boolean,
    default: false
},
createdAt: {
type: Date,
default: Date.now
},
updatedAt: {
type: Date,
default: Date.now
}
});

studentSchema.pre('save', function (next) {
this.updatedAt = Date.now();
next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
