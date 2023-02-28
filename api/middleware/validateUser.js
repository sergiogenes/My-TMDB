const { validateToken } = require("../utils/token");

const validateUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log("token en el middleware", token);
  if (!token) return res.status(401).send("Token inexistente");

  const user = validateToken(token);

  if (!user.email) return res.status(401).send("Token incorrecto");

  req.user = user;

  next();
};

module.exports = { validateUser };
