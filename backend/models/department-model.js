const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const departmentSchema = new Schema({
departmentCode: { 
type: String, 
required: true, 
unique: true, 
trim: true 
},
departmentName: { 
type: String, 
required: true, 
trim: true 
},
headOfDepartment: { 
type: String, 
},
createdBy: { 
type: ObjectId, 
ref: 'User' 
},
updatedBy: { 
type: ObjectId, 
ref: 'User' 
}
}, 
{timestamps: true} 
);

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
