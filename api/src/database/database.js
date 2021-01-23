require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
);

module.exports = sequelize;