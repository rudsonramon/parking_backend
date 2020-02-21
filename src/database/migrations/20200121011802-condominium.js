'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('document', {
      document_abbreviation: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      document_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      document_observation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    }),

  down: queryInterface => queryInterface.dropTable('document'),
};
