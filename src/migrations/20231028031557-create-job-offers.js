'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('JobOffers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      company: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salary: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      employer: {
        type: Sequelize.STRING,
        allowNull: false,
      }
      // se pueden agregar más campos si queremos
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('JobOffers');
  },
};

