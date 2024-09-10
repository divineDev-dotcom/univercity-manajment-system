const User = require("../models/user-model");

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

module.exports = {registerUser};