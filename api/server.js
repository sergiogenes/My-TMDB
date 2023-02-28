// Configuración del server
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const db = require("./db");
const routes = require("./routes");

const server = express();
const port = 3001;

server.use(morgan("tiny"));
server.use(express.json());
server.use(cookieParser());

server.use("/api", routes);

server.get("/", (req, res) => {
  res.send("El server esta funcionando");
});

db.sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada");
    server.listen(3001, () => {
      console.log("El server está escuchando en el puerto: " + port);
    });
  })
  .catch((error) => console.error(error));
