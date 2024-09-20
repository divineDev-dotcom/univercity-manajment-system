/*
Controller: addUser
Description: Adds a new Admin or Faculty 
*/

const mongoose = require("mongoose");
const {User, Admin, Faculty} = require("../../models/user-model");

const addUser = async (req, res) => {
try {
const {userName, email, password, role, personalDetails} = req.body; // passed by client
const loggedInUserId = req.user._id; // added by authenticateJWT

// if a user by the provided userName or email already exists, return error
const existingUser = await User.findOne({ $or: [ {userName}, {email} ] });
if (existingUser) {
console.error(`User with username '${userName}' or email '${email}' already exists`);
return res.status(400).json({error: true, msg: `Username or email already exists`});
}

let newUser = null;
switch (role) {
case "admin":
newUser = new Admin({
userName, email, password, personalDetails,
createdBy: loggedInUserId,
updatedBy: loggedInUserId
});
break;
case "faculty":
const {dateOfJoining, salary, subjects, isAlumni} = req.body;
newUser = new Faculty({
userName, email, password, personalDetails,
salary, isAlumni,
createdBy: loggedInUserId,
updatedBy: loggedInUserId
});
if (dateOfJoining) newUser.dateOfJoining = dateOfJoining;
if (subjects && subjects.length) newUser.subjects = subjects;
break;
default:
return res.status(400).json({error: true, msg: `Invalid role: ${role}`});
} // end switch

// add the newly created user to the database
await newUser.save();
return res.status(201).json({error: false, msg: `New ${role} saved`, data: newUser});
} catch(error) {
console.error(`An error occured while adding user: ${error.message}`);
return res.status(500).json({error: true, msg: `Error saving user: ${error.message}`});
}
};

module.exports = addUser;