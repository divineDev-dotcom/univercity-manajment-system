/*
Contents:
* authenticateJWT
	Parameters: req, res, next
	Description: checks if the token provided in the authorization header is a valid JWT token.
		Calls next middleware if successful.
		Returns error status and message otherwise.
*/

const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
const secretKey = process.env.SECRET_KEY;
const authHeader = req.headers.authorization; // extracting authorization header from the request
if (authHeader && authHeader.startsWith("Bearer")) {
const token = authHeader.split(" ")[1]; // splitting the value of authorization header to get its second part - the token
jwt.verify(token, secretKey, (error, payload) => {
if (error) {
return res.status(403).json( {error: true, msg: "Invalid token"} );
}
// else received a valid JWT token which will be checked for authentication 
req.user = payload; // assigning the decoded user credentials to be processed further
next(); // calling the next middleware
});
} else {
return res.status(401).json( {error: true, msg: `Token is missing: ${error.message}`} );
}
};

module.exports = authenticateJWT;