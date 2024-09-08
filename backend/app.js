require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/user-router");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/user", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, (error) => {
if (error) console.error(`Error starting the server: ${error}.`);
else console.log(`The UMS server is up at port ${port}.`);
});
