require("dotenv").config();
const app = require("./app");
const {connectToDB, gracefulShutdown} = require("./helpers/server-helper");

const startServer = async () => {
try {
await connectToDB();
// start the express server
const port = process.env.PORT || 5000;
app.listen(port, (error) => {
if (error) console.error(`Error starting the server: ${error}.`);
else console.log(`The UMS server is up at port ${port}.`);
});
} catch(error) {
console.error(`Error starting server: ${error}`);
process.exit(1);
}
};

// handle termination signals
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// connect to database and start express server
startServer();