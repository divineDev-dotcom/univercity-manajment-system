/*
Each document will track the leaves applied and their status.
*/
const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const LeaveSchema = new Schema({
userId: {type: ObjectId, ref: "User", required: true},
type: {
type: String,
enum: ["sick", "casual", "earned"],
required: true
},
startDate: {type: Date, required: true},
endDate: {type: Date, required: true},
status: {
type: String,
enum: ["approved", "pending", "rejected"],
default: "pending",
required: true
},
createdBy: {type: ObjectId, ref: "User"},
updatedBy: {type: ObjectId, ref: "User"}
},
{timestamps: true}
);

const Leave = mongoose.model("Leave", LeaveSchema);

module.exports = Leave;
