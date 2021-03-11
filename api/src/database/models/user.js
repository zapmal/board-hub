module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar_url: DataTypes.STRING,
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { tableName: 'user' });

  User.associate = (models) => {
    User.hasOne(models.cellphone, {
      foreignKey: 'user_id',
      as: 'userCellphone',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    User.hasMany(models.board, {
      foreignKey: 'user_id',
      as: 'userBoards',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return User;
};