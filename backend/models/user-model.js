/*
Model name: User
Description: 
	Contains details of a user including personal details, profile picture, and role like, student, faculty, admin, etc.
	Also, contains the information about when and by whom the document was created / updated.
*/

const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
  role: {
    type: String,
    enum: ["student", "faculty", "admin", "super-admin"],
    required: true
  },
  personalDetails: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
birthday: {type: Date, required: true},
    phone: { type: String, trim: true  },
    address: { type: String, trim: true },
    city: { type: String, trim: true  },
state: {type: String, trim: true},
    country: { type: String, trim: true },
    zipCode: { type: Number }
  },
  profilePicture: { type: String, trim: true },
  createdBy: { type: ObjectId, ref: "User" },
  updatedBy: { type: ObjectId, ref: "User" }
}, 
{timestamps: true}
);

/** middleware */
// use bcrypt to hash the password before saving
userSchema.pre("save", async function(next) {
// if the password is not modified skip this function and call the next middleware
if (!this.isModified("password")) next();
// if password has been modified, hash it with the salt and then save
try {
const salt = await bcrypt.genSalt(10);
this.passsword = await bcrypt.hash(this.password, salt);
next();
} catch(error) {
next(error);
}
});

// compare function to compare password with stored hashed password
userSchema.methods.comparePassword = async function(inputPassword) {
return await bcrypt.compare(inputPassword, this.password);
}
/** end of middleware **/

const User = mongoose.model("User", userSchema);

module.exports = User;
