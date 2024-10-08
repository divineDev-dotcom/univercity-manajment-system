/*
User model is the base model that will contain the following personas:
- Super Admin, having all access
- Admin, having access to administrative tasks
- Student, containing information about the courses that the student has applied, completed, or left.
- Faculty, maintaining records of the faculty, subjects being taught, salary, and other  details.
User schema is the base schema and other schemas are discriminators containing their specific information.
The "role" field is used as the discriminator key.
*/

const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;
const { hashPassword, hashPasswordForUpdate, comparePassword } = require("../helpers/password-helper.js");
const studentSchema = require("./users/student-schema");
const facultySchema = require("./users/faculty-schema");
const adminSchema = require("./users/admin-schema");

// array of allowed roles
const allowedRoles = ["super-admin", "admin", "faculty", "student" ];
const getUserRoles = () => { return allowedRoles }; // to be used by other modules

const userSchema = new Schema({
userName: { type: String, required: true, unique: true, trim: true },
password: { type: String, required: true },
email: { type: String, required: true, unique: true, trim: true },
role: { type: String, enum: allowedRoles, required: true, trim: true },

isActive: { type: Boolean, default: true, required: true, trim: true },
reasonOfDeactivation: { type: String, trim: true }, // should be noted if user has been deactivated

personalDetails: {
firstName: { type: String, required: true, trim: true },
lastName: { type: String, required: true, trim: true },
birthday: {type: Date, required: true},
gender: { type: String, enum: ["female", "male", "other"], required: true, trim: true },
phone: { type: String, required: true, trim: true  },
address: { type: String, required: true, trim: true },
city: { type: String, required: true, trim: true  },
state: {type: String, required: true, trim: true},
country: { type: String, required: true, trim: true },
zipCode: { type: String, required: true }
  },
profilePicture: { type: String, trim: true },

createdBy: { type: ObjectId, ref: "User", required: true },
updatedBy: { type: ObjectId, ref: "User" }
}, 
{ timestamps: true, discriminatorKey: "role" }
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
const SuperAdmin = User.discriminator("super-admin", new Schema({}, {_id: false}));
const Admin = User.discriminator("admin", adminSchema);
const Student = User.discriminator("student", studentSchema);
const Faculty = User.discriminator("faculty", facultySchema);

module.exports = {User, SuperAdmin, Admin, Student, Faculty, getUserRoles};