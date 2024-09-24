const express = require("express");
const authenticateJWT = require("../middleware/jwt.js");
const {isValidId} = require("../middleware/data-validations");
const {isAdmin, isAdminOrSelf} = require("../middleware/route-access-authentication");
const { createDepartment, getDepartments, getDepartmentById, deleteDepartment } = require("../controllers/department-controller");
const departmentRouter = express.Router();

// Create a department
departmentRouter.post("/createDepartment",  authenticateJWT, isAdmin, createDepartment);

// get all departments if no id provided 
departmentRouter.get("/departments/:id?", authenticateJWT, isAdminOrSelf, isValidId, getDepartments);

// Delete a department by ID
departmentRouter.delete("/deleteDepartment/:_id", authenticateJWT, isValidId, isAdmin, deleteDepartment);

module.exports = departmentRouter;
