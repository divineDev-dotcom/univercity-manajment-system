/*
Routes and their access:
/login - all users
/register - admin only
/profile - any by admin, self by others
/update-profile - any by admin, self by others
/delete - admin only
/get-users - admin only
*/

const express = require("express");
const authenticateJWT = require("../middleware/jwt.js");
const {isValidId} = require("../middleware/data-validations");
const {checkAdminOrSelf} = require("../middleware/route-access-authentication");
const {login, registerUser, getProfileById, updateUserProfile} = require("../controllers/user-controller");

const userRouter = express.Router();

// public routes
userRouter.post("/login", login);

// protected routes
userRouter.post("/register",  authenticateJWT, registerUser);
userRouter.get("/profile", authenticateJWT, getProfileById);
userRouter.put("/update-profile/:_id", authenticateJWT, isValidId, checkAdminOrSelf, updateUserProfile);

userRouter.get("/test", (req, res) => {
res.send("Testing user routes.");
});

module.exports = userRouter;