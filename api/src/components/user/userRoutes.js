import { Router } from 'express';
import {
  putPassword,
  putUsername,
} from './userController';
import {
  checkDuplicatedUser,
  checkToken,
} from '@middlewares/validators/auth';
import {
  validatePasswordUpdate,
  validateUsernameUpdate,
} from '@middlewares/validators/user';
import handler from '@utils/controllerHandler';

const router = Router();
const ROUTE_PREFIX = '/account';

router.use(checkToken);

router.put(`${ROUTE_PREFIX}/username`,
  [checkDuplicatedUser, validateUsernameUpdate],
  handler(putUsername, (request, response) => (
    [response.locals.user.id, request.body.username]
  )),
);

router.put(`${ROUTE_PREFIX}/password`,
  validatePasswordUpdate,
  handler(putPassword, (request, response) => (
    [
      response.locals.user.id,
      request.body.password,
      request.body.newPassword,
      response,
    ]
  )),
);

export default router;