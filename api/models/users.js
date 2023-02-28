const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../db");

class Users extends Sequelize.Model {
  hash(password, hash) {
    return bcrypt.hash(password, hash);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (hash) => hash === this.password
    );
  }
}

Users.init(
  {
    firstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    userName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

Users.addHook("beforeValidate", (user) => {
  user.salt = bcrypt.genSaltSync(8);
  return user
    .hash(user.password, user.salt)
    .then((hash) => (user.password = hash));
});

module.exports = Users;
