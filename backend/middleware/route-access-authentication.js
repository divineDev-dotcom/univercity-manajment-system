
const checkAdminOrSelf = (req, res, next) => {
const _id = req.params._id || req.query._id;
const loggedInUser = req.user; // extracted from JWT
if (loggedInUser.role !== "admin" && loggedInUser._id.toString() !== _id) {
return res.status(403).json({error: true, msg: "Forbidden: you do not have access to this resource"});
}
next(); // if the check passess, call the next module
};

module.exports = {checkAdminOrSelf};