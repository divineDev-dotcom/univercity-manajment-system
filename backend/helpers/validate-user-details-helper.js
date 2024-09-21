/*
For now, this function will only validate faculty and admin users.
Function: validateUserDetails
Parameters: userDetails object 
Returns:
	- null, if there is no validation error
	- appropriate error message in case of any validation error
Description: checks if any of the required fields is not provided
*/

const mongoose = require("mongoose");
const isValidRole = require("./validate-role-helper");
const { User } = require("../models/user-model");
const genderEnum = User.schema.path("personalDetails.gender").enumValues;

const validateUserDetails = (userDetails) => {
// user details should not be null
if (!userDetails) return `Missing user details object`;

// declaration of required fields
const requiredFields = ["userName", "email", "password", "role", "personalDetails"];
const requiredPersonalDetails = ["firstName", "lastName", "birthday", "gender", "phone", "address", "city", "state", "country", "zipCode"];

// check if required fields are present
for (let field of requiredFields) {
if (!userDetails[field]) return `Missing required field: ${field}`;
}

// check if required fields of personal details are missing
for (let field of requiredPersonalDetails) {
if (!userDetails.personalDetails[field]) return `Missing required personal detail: ${field}`;
}


// check if email is in correct pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if ( !emailRegex.test(userDetails.email) ) return `Invalid email: ${userDetails.email}`;

// check if gender value is valid as per User model
if ( !genderEnum.includes(userDetails.personalDetails.gender) ) {
return `Invalid gender: ${userDetails.personalDetails.gender}`;
}

// check if user details contain a valid role
if ( !isValidRole(userDetails.role) ) {
return `Invalid role: ${userDetails.role}`;
}

// perform extra checks based on specific roles
switch (userDetails.role) {
case "admin":
break;
case "faculty":
if (!userDetails.departmentId) return `Missing department Id for ${userDetails.role}`;
if ( !mongoose.Types.ObjectId.isValid(userDetails.departmentId) ) return `Invalid ObjectId passed as departmentId`;
if (!userDetails.salary) return `Missing salary for ${userDetails.role}`;
if (!userDetails.hireDate) return `Missing date of hiring for ${userDetails.role}`;

// validate date of hiring
const hireDate = new Date(userDetails.hireDate);
if ( isNaN(hireDate.getTime()) ) {
return `Invalid date format: ${hireDate}. Please provide date in the format YYYY/MM/DD`;
}

// check that hire date should not be more than current date
const currentDate = new Date();
if ( hireDate > currentDate ) {
return `Invalid date (${userDetails.hireDate}: )date of joining can not be a future date`;
}
break;
default:
return `Inappropriate role for the functionality: ${userDetails.role}`;
}

// if user is valid return null signifying no validation errors
return null;
};

module.exports = validateUserDetails;