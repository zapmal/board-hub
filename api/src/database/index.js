require('dotenv').config();
import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
const basename = path.basename(__filename);

const database = {};

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
);

fs.readdirSync(`${__dirname}/models`)
  .filter(file => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'))
  .forEach(file => {
    const model = require(path.join(`${__dirname}/models`, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    database[model.name] = model;
  });

Object.keys(database).forEach(model => {
  if ('associate' in database[model]) {
    database[model].associate(database);
  }
});

database.sequelize = sequelize;

module.exports = database;