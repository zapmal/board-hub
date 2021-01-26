module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('card', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notNull: { message: 'Card must have a title.' },
      },
    },
    content: DataTypes.TEXT,
    completed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: '0',
    },
    due_date: DataTypes.DATE,
    list_id: DataTypes.INTEGER,
  }, { tableName: 'card' });

  return Card;
};