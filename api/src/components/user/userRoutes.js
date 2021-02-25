import { Router } from 'express';
import {
  updateUsername,
  updatePassword,
} from './userController';
import {
  // checkDuplicatedUser,
  checkToken,
} from '@middlewares/validators/auth';
import handler from '@utils/controllerHandler';

const router = Router();
const ROUTE_PREFIX = '/account';

router.use(checkToken);

router.put(`${ROUTE_PREFIX}/username`,
  handler(updateUsername, (request, response) => (
    [response.locals.user.id, request.body.username]
  )),
);

router.put(`${ROUTE_PREFIX}/password`,
  handler(updatePassword, (request, response) => (
    [response.locals.user.id, request.body.password]
  )),
);

export default router;