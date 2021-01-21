const {
  Model,
} = require('sequelize');
const Cellphone = require('./cellphone');
const Board = require('./board');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    full_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
  }, { tableName: 'user' });

  User.hasOne(Cellphone, { foreignKey: 'user_id', sourceKey: 'id' });
  Cellphone.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' });

  User.hasMany(Board, { foreignKey: 'user_id', sourceKey: 'id' });
  Board.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' });

  return User;
};