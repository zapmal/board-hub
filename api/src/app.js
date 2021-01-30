import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(express.json());

module.exports = {
  app,
  PORT,
};