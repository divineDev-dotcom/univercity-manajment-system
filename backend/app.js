const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/user-router");
const departmentRouter = require("./routers/department-router");

const app = express();

// middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use("/user", userRouter);
app.use("/department", departmentRouter);

module.exports = app; 