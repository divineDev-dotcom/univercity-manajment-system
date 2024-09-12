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
try {
const { profileId } = req.query;  // extracting the profileId from query parameters
const loggedInUserId = req.user._id;  // extracting the logged-in user's id from JWT token
const loggedInUserRole = req.user.role;  // extracting the logged-in user's role from JWT token

// Check if profileId is valid
if (!mongoose.Types.ObjectId.isValid(profileId)) {
return res.status(400).json({ error: true, msg: "Invalid profileId" });
}

// Fetch the user profile by profileId
const userProfile = await User.findById(profileId).select("-password");

if (!userProfile) {
return res.status(404).json({ error: true, msg: "Profile not found" });
    }

// Admins can access any profile, but others can only access their own profile
if (loggedInUserRole === 'admin' || loggedInUserId.toString() === profileId) {
return res.status(200).json({
error: false,
data: {
userProfile: userProfile
}
});
} else {
return res.status(403).json({error: true, msg: "Forbidden: you do not have access to this resource"});
}
} catch (error) {
console.error(`An error occurred: ${error.message}`);
return res.status(500).json({ error: true, msg: `Error fetching profile: ${error.message}` });
}
};

module.exports = {login, registerUser, getProfileById};