const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const feeSchema = new Schema({
studentId: { type: ObjectId, ref: "Student", required: true },
amount: { type: Number, required: true },
paymentStatus: { 
type: String, 
enum: ["paid", "pending", "overdue"], 
required: true 
},
transactionId: { 
type: ObjectId, 
ref: "transaction", 
unique: true, 
trim: true 
},
dueDate: { type: Date, required: true },
createdBy: { type: ObjectId, ref: "User" },
updatedBy: { type: ObjectId, ref: "User" }
}, 
{ timestamps: true });

const Fee = mongoose.model("Fee", feeSchema);

module.exports = Fee;
