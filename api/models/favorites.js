const Sequelize = require("sequelize");

const db = require("../db");

class Favorites extends Sequelize.Model {}

Favorites.init(
  {
    contentId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: Sequelize.DataTypes.ENUM,
      values: ["movies", "tvs"],
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "favorites",
  }
);

module.exports = Favorites;
