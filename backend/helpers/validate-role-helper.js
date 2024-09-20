const {getUserRoles} = require("../models/user-model");

const isValidRole = (role) => {
const allowedRoles = getUserRoles();
return allowedRoles.includes(role);
};

module.exports = isValidRole;