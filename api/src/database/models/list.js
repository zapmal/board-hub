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

  List.hasMany(Card, {
    foreignKey: {
      name: 'list_id',
      allowNull: false,
    },
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Card.belongsTo(List, { foreignKey: 'list_id', sourceKey: 'id' });

  return List;
};