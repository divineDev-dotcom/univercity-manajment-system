const { User } = require("../../models/user-model");
const generateJWT = require("../../helpers/jwt-helper");

const login = async (req, res) => {
try {
const {userIdentity, password} = req.body;

// check that both exist
if ( !userIdentity || !password ) {
return res.status(400).json({error: true, msg: "Missing user name or password"});
}

// check if the user exists in the database
const existingUser = await User.findOne({ 
$or: [{userName: userIdentity}, {email: userIdentity}] 
}).select("+password");;
if (!existingUser) {
return res.status(404).json({error: true, msg: "No such user in the system"});
}

// Check the correctness of password
const isPasswordCorrect = await existingUser.comparePassword(password);
if (!isPasswordCorrect) {
return res.status(401).json({error: true, msg: "Invalid password"});
}

// remove the password field from the user data to be sent back
const userDetails = existingUser.toObject();
delete userDetails.password;

// generate the token and send it to the client for future authentications
const token = generateJWT(existingUser._id, existingUser.role);

// return the token and the user details
return res.status(200).json({
error: false, 
msg: "Login successful", 
data: { token, userDetails }
});
} catch(error) {
return res.status(500).json({error: true, msg: `Login failed: ${error.message}`});
}
};

module.exports = login;