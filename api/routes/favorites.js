const express = require("express");
const { Users, Favorites } = require("../models");
const { validateUser } = require("../middleware/validateUser");
const router = express.Router();

//Ruta que devuelve todos las movies o series favoritas del usuario logeado
router.get("/:category", validateUser, (req, res) => {
  const user = req.user;
  const category = req.params.category;

  Favorites.findAll({ where: { userId: user.id, category: category } }).then(
    (movies) => res.status(200).send(movies)
  );
});

//Ruta que devuelve todos las movies o series favoritas de un usuario cualquiere
router.get("/:userId/:category", validateUser, (req, res) => {
  const { userId, category } = req.params;

  Favorites.findAll({ where: { userId, category } }).then((movies) =>
    res.status(200).send(movies)
  );
});

//Ruta para agregar una movie o serie a favoritos

router.post("/:category", validateUser, (req, res) => {
  const userId = req.user.id;
  const contentId = req.body.id;
  const category = req.params.category;
  //console.log("userId", userId, "contentId", contentId, "category", category);
  Favorites.create({ contentId, category, userId })
    .then((movie) => res.status(201).send(movie))
    .catch((error) => res.status(500).send(error));
});

//Ruta para eliminar una movie o serie de favoritos

router.delete("/:category/:id", validateUser, (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  const category = req.params.category;
  //console.log("userId", userId, "contentId", contentId, "category", category);
  Favorites.findOne({ where: { contentId: id, category } })
    .then((movie) => {
      const movieToDelete = movie.dataValues;
      console.log("movieToDelete", movieToDelete);
      Favorites.destroy({ where: { contentId: id, category, userId } }).then(
        () => {
          res.status(200).send(movieToDelete);
        }
      );
    })
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
