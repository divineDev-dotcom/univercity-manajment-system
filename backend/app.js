require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {startServer, gracefulShutdown} = require("./helpers/server-helper");
const userRouter = require("./routers/user-router");

const app = express();

// middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use("/user", userRouter);

// handle termination signals
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// connect to database and start the server
startServer(app); 