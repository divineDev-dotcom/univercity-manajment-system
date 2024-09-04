const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const facultySchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  department: {
    type: ObjectId,
    ref: "Department",
    required: true
  },
  coursesAssigned: [{
    type: ObjectId,
    ref: "Course"
  }],
  dateOfJoining: {
    type: Date
  },
  salary: {
    basicSalary: {
      type: Number,
      required: true
    },
    bonuses: {
      type: Number,
      default: 0
    },
    deductions: {
      type: Number,
      default: 0
    },
    paymentHistory: [{
      amount: {
        type: Number,
        required: true
      },
      date: {
        type: Date
      }
    }]
  },
  leaveBalance: {
    type: Number
  },
  leaveRequests: [{
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    }
  }]
}, 
{ timestamps: true });

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
