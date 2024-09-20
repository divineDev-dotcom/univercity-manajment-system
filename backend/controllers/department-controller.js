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

// Get all departments

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    // Check if there are no departments
    if (departments.length === 0) {
      return res.status(404).json({error: true, msg: 'No departments found'});
    }

    // Return the list of departments as JSON
    res.status(200).json(error: false, msg: "Departments found", data: departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
return res.status(500).json({error: true, msg: 'Server error, could not fetch departments' });
  }
};


// Get department by ID
const getDepartmentById = async (req, res) => {
try {
const department = await Department.findById(req.params.id).populate("headOfDepartment createdBy updatedBy");
if (!department) {
return res.status(404).json({ error: true, msg: "Department not found" });
}
return res.status(200).json({error: false, msg: 'Department found', data: department });
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
