const express = require("express");
const router = express.Router();
const { Users, Favorites } = require("../models");
const { generateToken } = require("../utils/token");
const { validateUser } = require("../middleware/validateUser");

router.get("/", (req, res) => {
  Users.findAll().then((users) => res.status(200).send(users));
});

//Ruta para crear un usuario

router.post("/", (req, res) => {
  console.log("req.body dentro de post users ==>>", req.body);
  const { firstName, lastName, email, userName, birthday, password } = req.body;
  Users.create({ firstName, lastName, email, userName, birthday, password })
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(500).send(error));
});

//Ruta login de usuario

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ where: { email } })
    .then((user) => {
      if (!user.email)
        return res.status(404).send("Usurio y/o contraseña incorrecta");

      user.validatePassword(password).then((result) => {
        console.log("validate ==>>", result);
        if (!result)
          return res.status(404).send("Usurio y/o contraseña incorrecta");
        console.log("user de login ===>>", user);
        const { id, firstName, lastName, email } = user.dataValues;

        const token = generateToken({ id, firstName, lastName, email });
        res.cookie("token", token);
        res.send(user);
      });
    })
    .catch((error) => res.status(404).send(error));
});

// Ruta con un usuario logeado

router.get("/myUser", validateUser, (req, res) => {
  const user = req.user;
  res.send(user);
});

module.exports = router;
