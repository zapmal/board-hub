module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { message: 'Please enter your name.' },
      },
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { message: 'Username cannot be empty.' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { message: 'Please enter your name.' },
        isEmail: { message: 'Your email must be a valid email address.' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { message: 'Password cannot be empty.' },
        min: 8,
      },
    },
    avatar_url: DataTypes.STRING,
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true,
      },
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