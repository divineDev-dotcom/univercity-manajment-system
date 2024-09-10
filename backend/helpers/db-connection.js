//require("dotenv").config({ path: "./backend/.env" });
const mongoose = require("mongoose");

const connectToDB = async () => {
try {
//console.log(process.env.MONGO_URI);
await mongoose.connect(process.env.MONGO_URI, {
maxPoolSize: parseInt(process.env.MAX_POOL_SIZE, 10),
serverSelectionTimeoutMS: parseInt(process.env.SERVER_SELECTION_TIMEOUT_MS, 10),
socketTimeoutMS: parseInt(process.env.SOCKET_TIMEOUT_MS)
});
console.log("Connected to database.");
} catch(error) {
console.error(error);
process.exit(1); // no point of running the server if coonection pool is not established
}
};

connectToDB();
//module.exports = connectToDB;