/*
Each document will contain holiday plan for the year.
*/
const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

const HolidayPlanSchema = new Schema({
year: {type: Number, required: true, unique: true},
holidays: [{
date: {type: Date, required: true},
description: {type: String, required: true, trim: true},
type: {
type: String,
enum: ["public", "restricted", "weekend"],
required: true, trim: true
}
}],
leaveQuota: {
sickLeaves: {type: Number, default: 12},
casualLeaves: {type: Number, default: 12},
earnedLeaves: {type: Number, default: 12},
restrictedHolidays: {type: Number, default: 2}
},
createdBy: {type: ObjectId, ref: "User", required: true},
updatedBy: {type: ObjectId, ref: "User"}
}, 
{timestamps: true}
);

const HolidayPlan = mongoose.model("HolidayPlan", HolidayPlanSchema)

module.exports = HolidayPlan;