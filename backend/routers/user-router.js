/*
Routes and their access:
/login - all users
/register - admin only
/get-profile - any by admin, self by others
/update - any by admin, self by others
/delete - admin only
/get-users - admin only
*/

const express = require("express");
const userRouter = express.Router();

userRouter.get("/login", async (req, res) => {
res.send("Testing user login route.");
});

module.exports = userRouter;