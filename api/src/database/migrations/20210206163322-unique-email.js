module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('user', {
      type: 'unique',
      fields: ['email'],
      name: 'user_unique_email',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('user', 'user_unique_email');
  },
};
