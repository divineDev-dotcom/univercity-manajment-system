/*
Contents:
* generateJWT
	Parameters: id and role of the user
	Description: Generates JsonWebToken using id and role as payload.
	Returns generated JWT.
*/

require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");

const generateJWT = (id, role) => {
const secretKey = process.env.SECRET_KEY;
token = jwt.sign(
{id: id, role: role},
secretKey,
{ expiresIn: "1d" }
);
return token;
};

module.exports = generateJWT;