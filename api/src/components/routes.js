import authRoutes from './auth';
import boardRoutes from './board';
import userRoutes from './user';

/**
 * This file, if needed, can also export the routes aside from the loader.
 */
const PREFIX = '/api';
const routes = [
  authRoutes,
  boardRoutes,
  userRoutes,
];

const loadRoutes = (app) => (
  routes.forEach(route => app.use(PREFIX, route))
);

export default loadRoutes;
