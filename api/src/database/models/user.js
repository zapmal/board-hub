module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notNull: { message: 'Please enter your name.' },
        isAlpha: { message: 'Your name can only contain letters.' },
      },
    },
    user_name: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: { message: 'Please enter your name.' },
        isEmail: { message: 'Your email must be a valid email adress.' },
      },
    },
    password: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
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