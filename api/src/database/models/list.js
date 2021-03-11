module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('list', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    board_id: DataTypes.INTEGER,
  }, { tableName: 'list' });

  List.associate = (models) => {
    List.hasMany(models.card, {
      foreignKey: 'list_id',
      as: 'listCards',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return List;
};
