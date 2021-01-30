import express from 'express';
import morgan from 'morgan';
import { logger, customMorganFormat } from './libs/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan(customMorganFormat));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/logger', (req, res) => {
  logger.error(req.query.id);
  res.json({ m: 'j' });
});

module.exports = {
  app,
  PORT,
};