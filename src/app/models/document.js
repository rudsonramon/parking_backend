const { sequelize, DataTypes } = require('../../database/config');

const Documents = sequelize.define(
  'document',
  {
    // Model attributes are defined here
    document_abbreviation: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      //      defaultValue: 'CPF',
    },
    document_name: {
      type: DataTypes.STRING,
    },
    document_observation: {
      type: DataTypes.STRING,
    },
  },
  {
    // Model options
    freezeTableName: true,
    timestamps: false, //Não adicionará as colunas createdAt e updatedAt timestamps para o modelo;
    tableName: 'document', // define the table's name
  },
);
module.exports = Documents;
