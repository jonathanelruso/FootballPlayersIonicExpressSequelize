const db = require("../models");
const FootballPlayer = db.football_players;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const footballPlayer = {
    name: req.body.name,
    age: req.body.age,
    club: req.body.club,
    position: req.body.position,
  };

  FootballPlayer.create(footballPlayer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong",
      });
    });
};

exports.findAll = (req, res) => {
  FootballPlayer.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  FootballPlayer.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Player was updated successfully" });
      } else {
        res.send({
          message:
            err.message ||
            `Cannot update player with id=${id}. Maybe player was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating player with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  FootballPlayer.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Player was deleted successfully" });
      } else {
        res.send({
          message: `Cannot delete player with id=${id}. Maybe player was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete player with id=" + id,
      });
    });
};
