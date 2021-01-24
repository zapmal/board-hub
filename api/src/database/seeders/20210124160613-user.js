const faker = require('faker');
const bcrypt = require('bcryptjs');

const users = [...Array(50)].map(user => ({
  full_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  user_name: faker.internet.userName(),
  password: bcrypt.hashSync('password'),
  avatar_url: faker.image.imageUrl(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  },
};
