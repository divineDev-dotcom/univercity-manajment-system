const mongoose = require("mongoose");
const Department = require("../../models/department-model");

const createTestDepartmentObject = () => {

const sampleDepartment = new Department ({
    departmentCode: "CS101",
    departmentName: "Computer Science",
    headOfDepartment: "Dr. John Doe",
    createdBy: new mongoose.Types.ObjectId(), 
});
return sampleDepartment;
};

module.exports = createTestDepartmentObject;