/*
Controller: addUser
Description: Adds a new Admin or Faculty 
*/

const mongoose = require("mongoose");
const {User, Admin, Faculty} = require("../../models/user-model");
const validateUserDetails = require("../../helpers/validate-user-details-helper");
const createUser = require("../../helpers/create-user-helper");

const addUser = async (req, res) => {
try {
const userDetails = req.body.userDetails || req.body; // passed by client
const loggedInUserId = req.user._id; // added by authenticateJWT

// validate user details including the role of the user to be created
const validationError = validateUserDetails(userDetails);
if (validationError) {
return res.status(400).json({error: true, msg: validationError});
}

// if a user by the provided userName or email already exists, return error
const existingUser = await User.findOne({ $or: [ {userName: userDetails.userName}, {email: userDetails.email} ] });
if (existingUser) {
return res.status(400).json({error: true, msg: `Username or email already exists`});
}

// create a new user depending on the role provided
const newUser = createUser(userDetails);

if (typeof newUser === "string" && newUser === "Invalid role") {
return res.status(400).json({error: true, msg: `Invalid route for ${userDetails.role} creation`});
}

// add the information about who is creating the user
newUser.createdBy = loggedInUserId,
newUser.updatedBy = loggedInUserId

// add the newly created user to the database
await newUser.save();
return res.status(201).json({error: false, msg: `New ${newUser.role} saved`, data: newUser});
} catch(error) {
console.error(`Error saving user: ${error.message}`);
return res.status(500).json({error: true, msg: `Error saving user: ${error.message}`});
}
};

module.exports = addUser;