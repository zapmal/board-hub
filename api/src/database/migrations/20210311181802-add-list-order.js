module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('list', 'order', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('list', 'order');
  },
};
