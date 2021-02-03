import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { customMorganFormat } from '@libs/logging/logger';
import { authRoutes } from '@components/auth';

const app = express();
const PORT = process.env.PORT || 3000;
const PREFIX = '/api';

app.use(morgan(customMorganFormat));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(PREFIX, authRoutes);

export {
  app,
  PORT,
};