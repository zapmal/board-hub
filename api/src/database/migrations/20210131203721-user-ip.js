module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('user', 'ip_address', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('user', 'ip_address');
  },
};
