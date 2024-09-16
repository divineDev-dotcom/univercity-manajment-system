const bcrypt = require("bcryptjs");

// use bcrypt to hash the password before saving
const hashPassword = async function(next) {
// if the password is not modified skip this function and call the next middleware
if (!this.isModified("password")) return next();
// if password has been modified, hash it with the salt and then save
try {
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
} catch(error) {
next(error);
}
};

// hash password before updating
const hashPasswordForUpdate = async function(next) {
const update = this.getUpdate();
const plainPassword = update?.password || update?.$set?.password; // Handles possible nesting
if (!plainPassword) return next();
try {
const salt = await bcrypt.genSalt(10);
if (update.password) { // if password is directly present
update.password = await bcrypt.hash(update.password, salt);
} else if (update.$set?.password) {
update.$set.password = await bcrypt.hash(update.$set.password, salt);
}
next();
} catch (error) {
next(error);
}
};

// compare function to compare password with stored hashed password
const comparePassword = async function(inputPassword) {
return await bcrypt.compare(inputPassword, this.password);
};

module.exports = { hashPassword, hashPasswordForUpdate, comparePassword };