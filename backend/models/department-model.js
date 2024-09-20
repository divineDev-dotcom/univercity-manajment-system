const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentCode: { type: String, required: true },
    departmentName: { type: String, required: true },
    headOfDepartment: { type: String},
createdBy: {type: ObjectId, ref: 'User'},
updatedBy: {type: ObjectId, ref: 'User'}
}, 
{timestamps: true});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
