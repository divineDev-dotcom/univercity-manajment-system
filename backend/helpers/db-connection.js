const mongoose = require("mongoose");

const connectToDB = async () => {
try {
console.log(process.env.MONGO_URI);
await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to database.");
} catch(error) {
console.error(error);
}
};

module.exports = connectToDB;