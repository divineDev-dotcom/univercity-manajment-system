const bcrypt = require("bcryptjs");

// use bcrypt to hash the password before saving
const hashPassword = async function(next) {
// if the password is not modified skip this function and call the next middleware
if (!this.isModified("password")) next();
// if password has been modified, hash it with the salt and then save
try {
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
} catch(error) {
next(error);
}
};

// compare function to compare password with stored hashed password
const comparePassword = async function(inputPassword) {
return await bcrypt.compare(inputPassword, this.password);
};

module.exports = { hashPassword, comparePassword };