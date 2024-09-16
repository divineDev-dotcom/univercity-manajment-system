const mongoose = require("mongoose");

const isValidId = (req, res, next) => {
const _id = req.params._id ? req.params._id  : req.query._id;
if (!mongoose.Types.ObjectId.isValid(_id)) {
return res.status(400).json({error: true, msg: "Received invalid ID for requested resource"});
}
next();
};

module.exports = {isValidId};