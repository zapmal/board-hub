'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const UserCellphone = sequelize.define('UserCellphone', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    cellphone: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, { tableName: 'user_cellphone' });

  return UserCellphone;
};