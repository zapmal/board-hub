'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('board', 'description', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('board', 'description');
  },
};
