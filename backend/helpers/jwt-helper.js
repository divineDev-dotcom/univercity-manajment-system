/*
Contents:
* generateJWT
	Parameters: id and role of the user
	Description: Generates JsonWebToken using id and role as payload.
	Returns generated JWT.
*/

const jwt = require("jsonwebtoken");

const generateJWT = (id, role) => {
const secretKey = process.env.SECRET_KEY;
const token = jwt.sign(
{id: id, role: role},
secretKey,
{ expiresIn: "1d" }
);
return token;
};

module.exports = generateJWT;