/*
Please note that this function does not support creation of a student, as it will be handled separately by createStudent function.
Function name: createUserObject
Parameters: valid userDetails object containing details of the user to be added (take help of validateUserDetails function to check validity of userDetails object)
Returns: 
	- user object that represents any one of the following - Admin or Faculty
	- String "Invalid role", if role is invalid for this function
Description: Depending of the role property in the userDetails object, this function creates an admin or faculty user to be used by insert operation in the database.
*/

const mongoose = require("mongoose");
const {User, Admin, Faculty} = require("../models/user-model");

const createUserObject = (userDetails) => {
let user = null;

switch (userDetails.role) {
case "admin":
user = new Admin({
userName: userDetails.userName, 
email: userDetails.email, 
password: userDetails.password, 
personalDetails: userDetails.personalDetails,
salary: userDetails.salary,
hireDate: userDetails.hireDate,
});
break;

case "faculty":
user = new Faculty({
userName: userDetails.userName, 
email: userDetails.email, 
password: userDetails.password, 
personalDetails: userDetails.personalDetails,
departmentId: userDetails.departmentId,
salary: userDetails.salary,
hireDate: userDetails.hireDate,
});
if (userDetails.subjects && userDetails.subjects.length) user.subjects = userDetails.subjects;
break;

default:
return "Invalid role";
} // end switch

// add role to the newly created user as it is of base class type
user.role = userDetails.role;

// add employmentStatus if provided in the user details object, or else it will default to "working"
if (userDetails.employmentStatus) user.employmentStatus = userDetails.employmentStatus;

return user;
};

module.exports = createUserObject;