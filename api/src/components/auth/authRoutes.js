import { Router } from 'express';
import { signup, signin, getMe } from './authController';
import {
  validateSignup,
  validateSignin,
  checkDuplicatedUser,
  checkToken,
} from '@middlewares/validators/auth';
import handler from '@libs/controllerHandler';

const router = Router();

router.post('/signup',
  [validateSignup, checkDuplicatedUser],
  handler(signup, (request) => (
    [request.body, request.connection.remoteAddress]
  )),
);

router.post('/signin',
  validateSignin,
  handler(signin, (request, response) => (
    [request.body.email, request.body.password, response]
  )),
);

router.get('/me',
  checkToken,
  handler(getMe, (request, response) => (
    [response.locals.user]
  )),
);

export default router;