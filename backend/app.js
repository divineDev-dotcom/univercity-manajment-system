const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/user-router");

const app = express();

// middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use("/user", userRouter);

module.exports = app; 