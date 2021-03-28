import express from 'express';
import dotenv from 'dotenv';
import { loadMiddlewares, loadRoutes } from './loaders';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

loadMiddlewares(app);
loadRoutes(app);

export { app, PORT };
