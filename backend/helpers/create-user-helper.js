/*
Please note that this function does not support creation of a student, as it will be handled separately by createStudent function.
Function name: createUser
Parameters: valid userDetails object containing details of the user to be added
Returns: 
	- user object that represents any one of the following - Admin or Faculty
	- String "Invalid role", if role is invalid for this function
	- "Inappropriate user details", if user details are incomplete / inappropriate for the user to be created
Description: Depending of the role property in the userDetails object, this function creates an admin or faculty user to be used by insert operation in the database.
*/

const mongoose = require("mongoose");
const {User, Admin, Faculty} = require("../models/user-model");

const createUser = (userDetails) => {
let user = null;
switch (userDetails.role) {
case "admin":
user = new Admin({
userName: userDetails.userName, 
email: userDetails.email, 
password: userDetails.password, 
personalDetails: userDetails.personalDetails
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
dateOfJoining: userDetails.dateOfJoining
});
if (userDetails.subjects && userDetails.subjects.length) user.subjects = userDetails.subjects;
break;
default:
return "Invalid role";
} // end switch
// add role to the newly created user as it is of base class type
user.role = userDetails.role;

return user;
};

module.exports = createUser;