const mongoose = require("mongoose");
const {User, SuperAdmin} = require("../models/user-model");

const connectToDB = async (app) => {
try {
// connect to the database
await mongoose.connect(process.env.MONGO_URI, {
maxPoolSize: parseInt(process.env.MAX_POOL_SIZE, 10),
serverSelectionTimeoutMS: parseInt(process.env.SERVER_SELECTION_TIMEOUT_MS, 10),
socketTimeoutMS: parseInt(process.env.SOCKET_TIMEOUT_MS, 10)
});
console.log("Connected to database.");
} catch(error) {
console.error(`An error occured while starting the server: ${error}`);
throw error;
}
};

// function to create super admin user at the time of startup
const createSuperAdmin = async () => {
try {
// find if super admin already exists
let superAdmin = await User.findOne({role: "super-admin"});
if (superAdmin) return; // no need to create as super admin already exists
superAdmin = new SuperAdmin({
userName: process.env.SUPERADMIN_USERNAME,
password: process.env.SUPERADMIN_PASSWORD,
email: "superadmin@example.com",
personalDetails: {
firstName: "Super",
lastName: "Admin",
birthday: Date.now(),
phone: "+00000000000",
address: "Super admin address",
city: "Super admin city",
state: "Super admin state",
country: "Super admin country",
zipCode: 0
}
});
superAdmin.createdBy = superAdmin._id; // created by self
const insertedUser = await superAdmin.save();
console.log(`Super admin created.`);
} catch(error) {
console.error(`An error occured while creating super admin: ${error.message}`);
throw error;
}
};

const gracefulShutdown = async () => {
try {
console.log("Shutting down server...")
await mongoose.disconnect();
console.log("Database connection closed.")
process.exit(0); // signalling normal termination
} catch(error) {
console.error(`Error during shutdown: ${error}`);
process.exit(1); // exit indicating shutdown failure
}
};

module.exports = {connectToDB, createSuperAdmin, gracefulShutdown}