
const checkAdminOrSelf = (req, res, next) => {
console.log("in check admin or self");
const {_id} = req.params; // extracting from request parameters
const loggedInUser = req.user; // extracted from JWT
if (loggedInUser.role !== "admin" && loggedInUser._id !== _id) {
return res.status(403).json({error: true, msg: "Forbidden: you do not have access to this resource"});
}
next(); // if the check passess, call the next module
};

module.exports = {checkAdminOrSelf};