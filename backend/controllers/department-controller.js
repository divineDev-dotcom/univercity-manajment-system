const Department = require("../models/department-model");

// create department

const createDepartment = async (req, res) => {
    try {
        const { departmentCode, departmentName, headOfDepartment} = req.body;

        // Validate input
        if (!departmentCode || !departmentName) {
            return res.status(400).json({ message: 'Department code and name are required.' });
        }

        // Check if department already exists
        const existingDepartment = await Department.findOne({
            $or: [
                { departmentCode },
                { departmentName }
            ]
        });

        if (existingDepartment) {
            return res.status(400).json({
                message: 'Department with this code or name already exists.'
            });
        }

        // Create new department
        const department = new Department({
            departmentCode,
            departmentName,
            headOfDepartment,
             createdBy: req.user._id,
             updatedBy: req.user._id
        });

        // Save to database
        await department.save();

        // Send response
        res.status(201).json({
            message: 'Department created successfully',
            data: department
        });
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};


// Get all departments
const getDepartments = async (req, res) => {
try {
const departments = await Department.find();
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
