const {
  Model,
} = require('sequelize');
const Card = require('./list');

module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('list', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    board_id: DataTypes.INTEGER,
  }, { tableName: 'list' });

  List.hasMany(Card, { foreignKey: 'list_id', sourceKey: 'id' });
  Card.belongsTo(List, { foreignKey: 'list_id', sourceKey: 'id' });

  return List;
};