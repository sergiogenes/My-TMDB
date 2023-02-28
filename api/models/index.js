const Users = require("./users");
const Favorites = require("./favorites");

Favorites.belongsTo(Users);

module.exports = { Users, Favorites };
