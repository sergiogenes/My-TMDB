const jwt = require("jsonwebtoken");

const SECRET = "SecretoDelServer";

const generateToken = function ({ id, firstName, lastName, email }) {
  return jwt.sign({ id, firstName, lastName, email }, SECRET, {
    expiresIn: "1d",
  });
};

const validateToken = function (token) {
  return jwt.verify(token, SECRET);
};

module.exports = { generateToken, validateToken };
