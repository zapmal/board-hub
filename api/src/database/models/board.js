const {
  Model,
} = require('sequelize');
const List = require('./list');

module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('board', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    is_favorite: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
  }, { tableName: 'board' });

  Board.hasMany(List, { foreignKey: 'board_id', sourceKey: 'id' });
  List.belongsTo(Board, { foreignKey: 'board_id', sourceKey: 'id' });

  return Board;
};