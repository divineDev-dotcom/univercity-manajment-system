/*
For now, this function will only validate faculty and admin users.
Function: validateUserDetails
Parameters: userDetails object 
Returns:
	- null, if there is no validation error
	- appropriate error message in case of any validation error
Description: checks if any of the required fields is not provided
*/

const { isValidRole } = require("./validate-role-helper");

const validateUserDetails = (userDetails) => {
// user details should not be null
if (!userDetails) return `Missing user details object`;

// declaration of required fields
const requiredFields = ["userName", "email", "password", "role", "personalDetails"];
const requiredPersonalDetails = ["firstName", "lastName", "birthday", "phone", "address", "city", "state", "country", "zipCode"];


// check if required fields are present
for (let field of requiredFields) {
if (!userDetails.field) return `Missing required field: ${field}`;
}

// check if required fields of personal details are missing
for (let field of requiredPersonalDetails) {
if (!userDetails.field) return `Missing required personal detail: ${field}`;
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
if (!userDetails.departmentId) return `Missing department Id for ${role}`;
if ( !mongoose.Types.ObjectId.isValid(userDetails.departmentId) ) return `Invalid ObjectId passed as departmentId`;
if (!userDetails.salary) return `Missing salary for ${userDetails.role}`;
if (!userDetails.dateOfJoining) return `Missing date of joining for ${userDetails.role}`;
break;
case "student":
break;
default:
return `Inappropriate role for the functionality: ${userDetails.role}`;
}

// if user is valid return null signifying no validation errors
return null;
};

module.exports = validateUserDetails;
