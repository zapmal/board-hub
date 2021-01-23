const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Card = sequelize.define('card', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  completed: DataTypes.BOOLEAN,
  due_date: DataTypes.DATE,
  list_id: DataTypes.INTEGER,
}, { tableName: 'card' });

module.exports = Card;