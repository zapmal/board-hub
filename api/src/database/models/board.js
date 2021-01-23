const List = require('./list');
const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Board = sequelize.define('board', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  is_favorite: DataTypes.BOOLEAN,
  user_id: DataTypes.INTEGER,
}, { tableName: 'board' });

Board.associate = (models) => {
  Board.hasMany(List, {
    foreignKey: {
      name: 'board_id',
      allowNull: false,
    },
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  List.belongsTo(Board, { foreignKey: 'board_id', sourceKey: 'id' });
};

module.exports = Board;