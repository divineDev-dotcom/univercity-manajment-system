const mongoose = require("mongoose");
const Department = require("../models/department-model");

// create department

const createDepartment = async (req, res) => {
const { departmentCode, departmentName, headOfDepartment} = req.body;

try {
// Validate input
if (!departmentCode || !departmentName) {
return res.status(400).json({error: true, msg: 'Department code and name are required.' });
}

// Check if department already exists
const existingDepartment = await Department.findOne({
$or: [
{ departmentCode },
{ departmentName }
]
});

if (existingDepartment) {
return res.status(400).json({error: true, msg: 'Department with this code or name already exists.'
});
}

// Create new department
const newDepartment = new Department({
departmentCode, departmentName, headOfDepartment,
createdBy: req.user._id,
updatedBy: req.user._id
});

// Save to database
await newDepartment.save();
return res.status(201).json({error: false, msg: 'Department created successfully',
data: newDepartment
});
} catch (error) {
return res.status(500).json({error: true, msg: `Error saving department: ${error.message}`
});
}
};

// get department according whether id provided or not

const getDepartments = async (req, res) => {
try {
// Check if department ID is provided in the request
if (req.params.id) {
// Get department by ID
const department = await Department.findById(req.params.id).populate("headOfDepartment createdBy updatedBy");

if (!department) {
return res.status(404).json({ error: true, msg: "Department not found" });
}

// Return the department found
return res.status(200).json({ error: false, msg: 'Department found', data: department });
} else {
// Get all departments
const departments = await Department.find().populate('createdBy updatedBy', 'userName');

// Check if no departments exist
if (departments.length === 0) {
return res.status(404).json({ error: true, msg: 'No departments found' });
}

// Return the list of departments
return res.status(200).json({ error: false, msg: "Departments found", data: departments });
}
} catch (error) {
    return res.status(500).json({ error: true, msg: 'Server error, could not fetch departments' });
}
};


// Delete a department by ID
const deleteDepartment = async (req, res) => {
const { id } = req.params;
try {
const deletedDepartment = await Department.findByIdAndDelete(id);
if (!deletedDepartment) {
return res.status(404).json({ error: true, msg: "Department not found" });
}
    return res.status(200).json({ error: false, msg: "Department deleted successfully" });
} catch (error) {
return res.status(500).json({ error: true, msg: `Error deleting department: ${error.message}` });
}
};

// update department by id
const updateDepartment = async (req, res) => {
const { id } = req.params;
const { departmentCode, departmentName, headOfDepartment } = req.body;

try {
// Validate input
if (!departmentCode || !departmentName) {
return res.status(400).json({
error: true,
msg: 'Department code and name are required.'
});
}

// Check if the department exists
const existingDepartment = await Department.findById(id);
if (!existingDepartment) {
return res.status(404).json({ error: true, msg: "Department not found." });
}

// Check for duplicate department code or name
const duplicateDepartment = await Department.findOne({
$or: [
{ departmentCode, _id: { $ne: id } }, // Exclude current department ID
{ departmentName, _id: { $ne: id } }
]
});

if (duplicateDepartment) {
return res.status(400).json({ error: true, msg: 'Department with this code or name already exists.' });
}

// Update department
const updatedDepartment = await Department.findByIdAndUpdate(
id,
{ departmentCode, departmentName, headOfDepartment, updatedBy: req.user._id },
{ new: true, runValidators: true }
);

return res.status(200).json({
error: false,
msg: "Department updated successfully",
data: updatedDepartment
});
} catch (error) {
return res.status(500).json({ error: true, msg: `Error updating department: ${error.message}` });
}
};

module.exports = {createDepartment, getDepartments, deleteDepartment, updateDepartment};
