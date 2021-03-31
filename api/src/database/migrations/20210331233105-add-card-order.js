module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('card', 'order', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('card', 'order');
  },
};
