/*
Contains the middleware to check if the request is coming from authorized resource.
Functions:
- isSuperAdmin: access is allowed only to super admin user
- isAdmin: access is allowed to super admin and admin users
- isAdminOrSelf: access is allowed to super admin, admin, or self
- isAdminOrFaculty: allows access to super admin, admin users or faculty
*/

const isSuperAdmin = (req, res, next) => {
const _id = req.params._id || req.query._id;
const loggedInUser = req.user; // extracted from JWT
if (loggedInUser.role !== "super-admin") {
return res.status(403).json({error: true, msg: "Forbidden: you do not have access to this resource"});
}
next(); // if the check passess, call the next module
};

const isAdmin = (req, res, next) => {
const _id = req.params._id || req.query._id;
const loggedInUser = req.user; // extracted from JWT
if (loggedInUser.role !== "super-admin" && loggedInUser.role !== "admin") {
return res.status(403).json({error: true, msg: "Forbidden: you do not have access to this resource"});
}
next(); // if the check passess, call the next module
};

const isAdminOrSelf = (req, res, next) => {
const _id = req.params._id || req.query._id;
const loggedInUser = req.user; // extracted from JWT
if (loggedInUser.role !== "super-admin" && loggedInUser.role !== "admin" && loggedInUser._id.toString() !== _id) {
return res.status(403).json({error: true, msg: "Forbidden: you do not have access to this resource"});
}
next(); // if the check passess, call the next module
};

const isAdminOrFaculty = (req, res, next) => {
const _id = req.params._id || req.query._id;
const loggedInUser = req.user; // extracted from JWT
if (loggedInUser.role !== "super-admin" && loggedInUser.role !== "admin" && loggedInUser.role !== "faculty") {
return res.status(403).json({error: true, msg: "Forbidden: you do not have access to this resource"});
}
next(); // if the check passess, call the next module
};

module.exports = {isSuperAdmin, isAdmin, isAdminOrSelf, isAdminOrFaculty};