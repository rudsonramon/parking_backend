const { sequelize, DataTypes } = require('../../database/config');

const Towers = sequelize.define(
  'tower',
  {
    tower_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      field: 'tower_id',
    },
    tower_name: {
      type: DataTypes.STRING,
      autoIncrement: false,
      field: 'tower_name',
    },
    tower_floors: {
      type: DataTypes.TINYINT,
      field: 'tower_floors',
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
    // define the table's name
    tableName: 'tower',
    timestamps: false, //Não adicionará as colunas createdAt e updatedAt timestamps para o modelo;
  },
);
module.exports = Towers;
