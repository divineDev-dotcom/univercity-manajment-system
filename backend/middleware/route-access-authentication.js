/*
Contains the middleware to check if the request is coming from authorized resource.
Functions:
- checkSuperAdmin: access is allowed only to super admin user
- checkAdmin: access is allowed to super admin and admin users
- checkAdminOrSelf: access is allowed to super admin, admin, or self
- checAdminOrFaculty: allows access to super admin, admin users or faculty
*/

const checkSuperAdmin = (req, res, next) => {
const _id = req.params._id || req.query._id;
const loggedInUser = req.user; // extracted from JWT
if (loggedInUser.role !== "super-admin") {
return res.status(403).json({error: true, msg: "Forbidden: you do not have access to this resource"});
}
next(); // if the check passess, call the next module
};

const checkAdmin = (req, res, next) => {
const _id = req.params._id || req.query._id;
const loggedInUser = req.user; // extracted from JWT
if (loggedInUser.role !== "super-admin" && loggedInUser.role !== "admin") {
return res.status(403).json({error: true, msg: "Forbidden: you do not have access to this resource"});
}
next(); // if the check passess, call the next module
};

const checkAdminOrSelf = (req, res, next) => {
const _id = req.params._id || req.query._id;
const loggedInUser = req.user; // extracted from JWT
if (loggedInUser.role !== "super-admin" && loggedInUser.role !== "admin" && loggedInUser._id.toString() !== _id) {
return res.status(403).json({error: true, msg: "Forbidden: you do not have access to this resource"});
}
next(); // if the check passess, call the next module
};

const checkAdminOrFaculty = (req, res, next) => {
const _id = req.params._id || req.query._id;
const loggedInUser = req.user; // extracted from JWT
if (loggedInUser.role !== "super-admin" && loggedInUser.role !== "admin" && loggedInUser.role !== "faculty") {
return res.status(403).json({error: true, msg: "Forbidden: you do not have access to this resource"});
}
next(); // if the check passess, call the next module
};

module.exports = {checkSuperAdmin, checkAdmin, checkAdminOrSelf, checkAdminOrFaculty};