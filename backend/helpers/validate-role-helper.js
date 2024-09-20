const {getRoles} = require("../models/user-model");

const isValidRole = (role) => {
const allowedRoles = getRoles();
return allowedRoles.includes(role);
};

module.exports = isValidRole;