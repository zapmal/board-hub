require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT,
  },
  production: {},
};