import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { customMorganFormat } from '@utils/logging/logger';
import { authRoutes } from '@components/auth';
import { boardsRoutes } from '@components/boards';

const app = express();
const PORT = process.env.PORT || 9000;
const PREFIX = '/api';

app.use(morgan(customMorganFormat));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(PREFIX, authRoutes);
app.use(PREFIX, boardsRoutes);

export {
  app,
  PORT,
};