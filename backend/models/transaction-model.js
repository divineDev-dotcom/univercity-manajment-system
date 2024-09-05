/*
Model name: Transaction
Description: Contains details of the financial transactions being conducted in the University, like fee payment, salary payment, purchases, etc.
*/

const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const transactionSchema = new Schema({
transactionType: {
type: String, 
enum: ["fee-payment", "salary", "purchase", "donation", "other"], 
required: true, 
trim: true
},
amount: {type: Number, required: true},
date: {type: Date, default: Date.now},
referenceId: {type: ObjectId}, // reference to another object, such as, student, faculty, etc.
description: {type: String, trim: true}, // optional description regarding the transaction, such as, fee payment for first semester
paymentMethod: {
type: String,
enum: ["cash", "bank-transfer", "credit-card", "upi"],
required: true,
trim: true
},
status: {
type: String,
enum: ["completed", "pending", "failed"],
required: true,
trim: true
},
remarks: {type: String, trim: true}, // optional remarks regarding the payment method
transactionCategory: {
type: String,
enum: ["income", "expense"],
required: true,
trim: true
},
createdBy: {type: ObjectId, required: true, ref: "User"}, 
updatedBy: {type: ObjectId, required: true, ref: "User"}, 
updateReason: {type: String, required: true, trim: true},
}, 
{timestamps: true}
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
