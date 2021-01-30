import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { customMorganFormat } from './libs/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan(customMorganFormat));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = {
  app,
  PORT,
};