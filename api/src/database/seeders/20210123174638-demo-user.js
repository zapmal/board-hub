module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      full_name: 'John',
      user_name: 'jdoe',
      email: 'jdoe@gmail.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  },
};
