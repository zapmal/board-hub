const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const Cellphone = require('./cellphone');
const Board = require('./board');

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

User.associate = (models) => {
  User.hasOne(Cellphone, {
    foreignKey: {
      name: 'user_id',
      allowNull: false,
    },
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Cellphone.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' });

  User.hasMany(Board, {
    foreignKey: {
      name: 'user_id',
      allowNull: false,
    },
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Board.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' });
};

module.exports = User;