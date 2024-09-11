const Department = require("../models/department-model");

// Create a new department
const createDepartment = async (req, res) => {
const { departmentCode, departmentName, headOfDepartment } = req.body;

try {
// restrict same department to create
const existingDepartment = await Department.findOne({ $or: [{ departmentName }, { departmentCode }] });
if (existingDepartment) {
return res.status(400).json({ error: true, msg: "Department name or code already exists" });
}

// Create a new department
const newDepartment = new Department({
departmentCode,
departmentName,
headOfDepartment,
createdBy: req.user._id,
updatedBy: req.user._id
});
await newDepartment.save();
return res.status(201).json({ error: false, msg: "Department created successfully", data: newDepartment });
} catch (error) {
return res.status(500).json({ error: true, msg: `Error saving department: ${error.message}` });
}
};

// Get all departments
const getDepartments = async (req, res) => {
try {
const departments = await Department.find().populate("headOfDepartment createdBy updatedBy");
return res.status(200).json({ error: false, data: departments });
} catch (error) {
return res.status(500).json({ error: true, msg: `Error fetching departments: ${error.message}` });
}
};

// Get department by ID
const getDepartmentById = async (req, res) => {
try {
const department = await Department.findById(req.params.id).populate("headOfDepartment createdBy updatedBy");
if (!department) {
return res.status(404).json({ error: true, msg: "Department not found" });
}
return res.status(200).json({ error: false, data: department });
} catch (error) {
return res.status(500).json({ error: true, msg: `Error fetching department: ${error.message}` });
}
};


// Delete a department by ID
const deleteDepartment = async (req, res) => {
try {
const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
if (!deletedDepartment) {
return res.status(404).json({ error: true, msg: "Department not found" });
}
    return res.status(200).json({ error: false, msg: "Department deleted successfully" });
} catch (error) {
return res.status(500).json({ error: true, msg: `Error deleting department: ${error.message}` });
}
};

module.exports = {createDepartment, getDepartments, getDepartmentById, deleteDepartment};
