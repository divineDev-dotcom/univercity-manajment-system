/*
Model name: User
Description: 
	Contains details of a user including personal details, profile picture, and role like, student, faculty, admin, etc.
	Also, contains the information about when and by whom the document was created / updated.
*/

const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "faculty", "admin", "super-admin"],
    required: true
  },
  personalDetails: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, trim: true  },
    address: { type: String, trim: true },
    city: { type: String, trim: true  },
    country: { type: String, trim: true },
    zipCode: { type: Number }
  },
  profilePicture: { type: String, trim: true },
  createdBy: { type: ObjectId, ref: "User" },
  updatedBy: { type: ObjectId, ref: "User" }
}, 
{timestamps: true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
