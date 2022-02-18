"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("faixa", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      numero: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      duracao: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      album_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "album" , key: "id"}
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable("faixa");
  },
};
