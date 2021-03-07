import authRoutes from '@components/auth';
import boardRoutes from '@components/board';
import userRoutes from '@components/user';

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
