/*
Model name: User
Description: 
	Contains details of a user including personal details, profile picture, and role like, student, faculty, admin, etc.
	Also, contains the information about when and by whom the document was created / updated.
*/

const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;
const { hashPassword, hashPasswordForUpdate, comparePassword } = require("../helpers/password-helper.js");
const studentSchema = require("./users/student-schema");
const applicantSchema = require("./users/faculty-schema");
const facultySchema = require("./users/faculty-schema");

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
  role: {
    type: String,
    enum: ["admin", "faculty", "student", "applicant", "alumni"],
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
{timestamps: true,
discriminator: "role" }
);

// hash password before saving or updating
userSchema.pre("save", hashPassword);
userSchema.pre("findOneAndUpdate", hashPasswordForUpdate);
userSchema.pre("findByIdAndUpdate", hashPasswordForUpdate);
// compare function to compare password with stored hashed password
userSchema.methods.comparePassword = comparePassword;

// base model 
const User = mongoose.model("User", userSchema);

// discriminators
const Admin = User.discriminator("admin", new Schema({}, {_id: false}));
const Student = User.discriminator("student", studentSchema);
const Faculty = User.discriminator("faculty", facultySchema);
const Applicant = User.discriminator("applicant", applicantSchema);

module.exports = {User, Admin, Student, Faculty, Applicant};