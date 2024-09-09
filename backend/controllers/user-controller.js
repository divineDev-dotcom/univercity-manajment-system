const User = require("../models/user-model");

const registerUser = async (req, res) => {
const {userName, email, password, role, personalDetails} = req.body;

try {
// ensure that the userName or email does not exist in the system
const existingUser = await User.findOne({ $or: [{userName}, {email}] });
if (existingUser) {
return res.status(400).json({msg: "Username or email already exists"});
}

// else create a new user object
const newUser = new User({
userName, email, password, role, personalDetails,
createdBy: req.user._id,
updatedBy: req.user._id
});

// save the user to the database
await newUser.save();
res.status(201).json({msg: "User registered successfully", user: newUser});
} catch(error) {
return res.status(500).json({msg: "Error saving user", error: error.message});
}
};

module.exports = {registerUser};