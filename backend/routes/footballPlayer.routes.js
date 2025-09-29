module.exports = (app) => {
  const footballPlayers = require("../controllers/football-player.controller.js");

  const router = require("express").Router();

  router.post("/", footballPlayers.create);

  router.get("/", footballPlayers.findAll);

  router.put("/:id", footballPlayers.update);

  router.delete("/:id", footballPlayers.delete);

  app.use("/api/football-players", router);
};
