const mongoose = require("mongoose");
const User = require("../models/user-model");
const generateJWT = require("../helpers/jwt-helper");

const login = async (req, res) => {
const {userIdentity, password} = req.body;
try {
// check if user exists in the database
const user = await User.findOne({
$or: [{userName: userIdentity}, {email: userIdentity}]
});
if (!user) {
return res.status(400).json({error: true, msg: "Invalid login credentials"});
}
// check if the password matches
const isPasswordCorrect = await user.comparePassword(password);
if (!isPasswordCorrect) {
return res.status(400).json({error: true, msg: "Invalid login credentials"});
}
const token = generateJWT(user._id, user.role);
return res.status(200).json({
error: false,
data: {
token: token,
user: {_id: user._id, role: user.role, email: user.email, personalDetails: user.personalDetails}
}
});
} catch(error) {
console.error(`An error occured: ${error.message}`);
return res.status(500).json({error: true, msg: `Login failed: ${error}`});
}
};

const registerUser = async (req, res) => {
const {userName, email, password, role, personalDetails} = req.body;

try {
// ensure that the userName or email does not exist in the system
const existingUser = await User.findOne({ $or: [{userName}, {email}] });
if (existingUser) {
return res.status(400).json({error: true, msg: "Username or email already exists"});
}

// else create a new user object
const newUser = new User({
userName, email, password, role, personalDetails,
createdBy: req.user._id,
updatedBy: req.user._id
});

// save the user to the database
await newUser.save();
return res.status(201).json({error: false, msg: "User registered successfully", data: newUser});
} catch(error) {
return res.status(500).json({error: true, msg: `Error saving user: ${error.message}`});
}
};

const getProfileById = async (req, res) => {
const { _id } = req.query;  // extracting the profileId from query parameters
const loggedInUserId = req.user._id;  // extracting the logged-in user's id from JWT token
try {
const userProfile = await User.findById(_id).select("-password");
if (!userProfile) {
return res.status(404).json({ error: true, msg: "Profile not found" });
    }
return res.status(200).json({
error: false,
data: userProfile
});
} catch (error) {
console.error(`An error occurred: ${error.message}`);
return res.status(500).json({ error: true, msg: `Error fetching profile: ${error.message}` });
}
};

const updateUserProfile = async (req, res) => {
const {_id} = req.params;
const loggedInUserId = req.user._id;
const {personalDetails} = req.body;
if (!personalDetails) {
return res.status(400).json({error: true, msg: "Personal details are required for updating user profile"});
}
try {
const updatedUser = await User.findByIdAndUpdate(
_id,
{ $set: {personalDetails, updatedBy: loggedInUserId} },
{ new: true, runValidators: true, select: "-password" }
);
if (!updatedUser) {
return res.status(404).json({error: true, msg: "User not found"});
}
return res.status(200).json({error: false, msg: "User profile updated", data: updatedUser});
} catch(error) {
console.error(`An error occured: ${error.message}`);
return res.status(500).json({error: true, msg: `Error updating the user: ${error.message}`});
}
};

module.exports = {login, registerUser, getProfileById, updateUserProfile} ;