/*
Function: checkUserDependencies
Parameter: the user object to be inserted or updated (created using the User model or its discriminators)
Returns: 
	- null, if there is no error
	- error message, in case of an error
*/

const mongoose = require("mongoose");
const { User } = require("../models/user-model");
const Department = require("../models/department-model");
const Subject = require("../models/subject-model");

const checkUserDependencies = async (user) => {
switch (user.role) {
case "faculty":
const existingDepartment = await Department.findById(user.departmentId);
if (!existingDepartment) return `Invalid departmentId: no such department registered`; 
if ( user.subjects && user.subjects.length > 0 ) {
for (let subjectId of user.subjects) {
const existingSubject = await Subject.findById(subjectId);
if (!existingSubject) `Invalid subjectId: no such subject registered`;
}
}
break;
} // end switch

return null;
};

module.exports = checkUserDependencies;