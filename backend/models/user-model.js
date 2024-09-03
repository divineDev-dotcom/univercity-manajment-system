/*
Model name: User
Description: 
	Contains details of a user including personal details, profile picture, and role (student, faculty, admin).
	Also, contains the information about when and by whom the document was created / updated.
*/

const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "faculty", "admin"],
    required: true
  },
  personalDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    zipCode: { type: Number }
  },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: ObjectId },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: ObjectId }
});

// Middleware to update updatedAt field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
