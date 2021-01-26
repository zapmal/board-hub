module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('card', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      completed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: '0',
      },
      due_date: {
        type: Sequelize.DATE,
      },
      list_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'list', key: 'id' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('card');
  },
};