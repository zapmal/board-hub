import { Router } from 'express';
import { signup, signin } from './authController';
import {
  validateSignup,
  validateSignin,
  checkDuplicatedUser,
} from '@middlewares/validators/auth';
import handler from '@libs/controllerHandler';

const router = Router();

router.post('/signup', [validateSignup, checkDuplicatedUser],
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

export default router;