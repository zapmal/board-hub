module.exports = (sequelize, DataTypes) => {
  const Cellphone = sequelize.define('cellphone', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { message: 'Cellphone cannot be empty.' },
      },
    },
    user_id: DataTypes.INTEGER,
  }, { tableName: 'cellphone' });

  return Cellphone;
};