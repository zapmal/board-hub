module.exports = (sequelize, DataTypes) => {
  const Cellphone = sequelize.define('cellphone', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: DataTypes.INTEGER,
  }, { tableName: 'cellphone' });

  return Cellphone;
};