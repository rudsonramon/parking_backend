const { sequelize, DataTypes } = require('../../database/config');

const ParkingLots = sequelize.define(
  'parking',
  {
    parking_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      field: 'parking_id',
    },
    parking_floor: {
      type: DataTypes.INTEGER,
      field: 'parking_floor',
    },
    parking_indoor: {
      type: DataTypes.TINYINT,
      field: 'parking_indoor',
    },
    parking_slot_blocked: {
      type: DataTypes.TINYINT,
      field: 'parking_slot_blocked',
    },
    parking_slot_size: {
      type: DataTypes.TINYINT,
      field: 'parking_slot_size',
    },
    parking_has_owner: {
      type: DataTypes.TINYINT,
      field: 'parking_has_owner',
    },
    parking_slot_blocks: {
      type: DataTypes.TINYINT,
      field: 'parking_slot_blocks',
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
    // define the table's name
    tableName: 'parking',
    timestamps: false, //Não adicionará as colunas createdAt e updatedAt timestamps para o modelo;
  },
);
module.exports = ParkingLots;
