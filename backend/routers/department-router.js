const express = require("express");
const departmentRouter = express.Router();
const { createDepartment, getDepartments, getDepartmentById, deleteDepartment } = require("../controllers/department-controller");

// Create a department
departmentRouter.post("/createDepartment", createDepartment);
// Get all departments
departmentRouter.get("/getDepartments", getDepartments);
// get one department by ID
departmentRouter.get("/getDepartmentByID", getDepartmentById);
// Delete a department by ID
departmentRouter.delete("/deleteDepartment:id", deleteDepartment);

module.exports = departmentRouter;
