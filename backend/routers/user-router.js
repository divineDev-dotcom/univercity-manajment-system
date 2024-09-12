/*
Routes and their access:
/login - all users
/register - admin only
/profile - any by admin, self by others
/update - any by admin, self by others
/delete - admin only
/get-users - admin only
*/

const express = require("express");
const authenticateJWT = require("../middleware/jwt.js");
const {login, registerUser, getProfileById} = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register",  authenticateJWT, registerUser);
userRouter.get("/profile", authenticateJWT, getProfileById);

userRouter.get("/test", (req, res) => {
res.send("Testing user routes.");
});

module.exports = userRouter;