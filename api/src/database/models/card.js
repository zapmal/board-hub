const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('card', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    list_id: DataTypes.INTEGER,
  }, { tableName: 'card' });

  return Card;
};