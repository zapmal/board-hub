module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('card', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    completed: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    list_id: DataTypes.INTEGER,
  }, { tableName: 'card' });

  return Card;
};