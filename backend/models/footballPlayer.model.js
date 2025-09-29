module.exports = (sequelize, Sequelize) => {
  const FootballPlayer = sequelize.define("football_player", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    club: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return FootballPlayer;
};
