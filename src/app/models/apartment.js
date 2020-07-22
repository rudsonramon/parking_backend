const { sequelize, DataTypes } = require('../../database/config');

const Apartments = sequelize.define(
  'apartment',
  {
    apartment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      field: 'apartment_id',
    },
    apartment_block_id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: false,
      field: 'apartment_block_id',
    },
    apartment_parking_id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      field: 'apartment_parking_id',
      allowNull: true,
    },
    apartment_floor: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      field: 'apartment_floor',
    },
    apartment_size: {
      type: DataTypes.TINYINT,
      autoIncrement: false,
      field: 'apartment_size',
      allowNull: true,
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
    // define the table's name
    tableName: 'apartment',
    timestamps: false, //Não adicionará as colunas createdAt e updatedAt timestamps para o modelo;
  },
);
module.exports = Apartments;
