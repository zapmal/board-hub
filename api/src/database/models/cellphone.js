const sequelize = require('../database');
const DataTypes = require('sequelize').DataTypes;

const Cellphone = sequelize.define('cellphone', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  cellphone: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
}, { tableName: 'cellphone' });

module.exports = Cellphone;