const mongoose = require("mongoose");

const startServer = async (app) => {
try {
// connect to the database
await mongoose.connect(process.env.MONGO_URI, {
maxPoolSize: parseInt(process.env.MAX_POOL_SIZE, 10),
serverSelectionTimeoutMS: parseInt(process.env.SERVER_SELECTION_TIMEOUT_MS, 10),
socketTimeoutMS: parseInt(process.env.SOCKET_TIMEOUT_MS, 10)
});
console.log("Connected to database.");

// start the express server
const port = process.env.PORT || 5000;
app.listen(port, (error) => {
if (error) console.error(`Error starting the server: ${error}.`);
else console.log(`The UMS server is up at port ${port}.`);
});
} catch(error) {
console.error(`An error occured while starting the server: ${error}`);
process.exit(1); // signalling erroneous behaviour
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

module.exports = {startServer, gracefulShutdown}