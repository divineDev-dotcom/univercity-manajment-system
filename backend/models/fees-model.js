const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const feesSchema = new Schema({
studentId: { type: ObjectId, ref: "Student", required: true },
amount: { type: Number, required: true },
paymentStatus: { 
type: String, 
enum: ["paid", "pending", "overdue"], 
required: true 
},
transactionId: { type: String, required: true, unique: true, trim: true },
dueDate: { type: Date, required: true },
createdBy: { type: ObjectId, ref: "User" },
updatedBy: { type: ObjectId, ref: "User" }
}, 
{ timestamps: true }
);

const Fees = mongoose.model("Fees", feesSchema);

module.exports = Fees;
