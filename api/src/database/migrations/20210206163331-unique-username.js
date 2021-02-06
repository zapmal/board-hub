module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('user', {
      type: 'unique',
      fields: ['user_name'],
      name: 'user_unique_username',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('user', 'user_unique_username');
  },
};