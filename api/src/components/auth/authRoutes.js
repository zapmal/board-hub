import { Router } from 'express';
import { signup, signin } from './authController';
import { validateSignup, validateSignin } from '@middlewares/validators/auth';
import handler from '@libs/controllerHandler';

const router = Router();

router.post('/signup',
  validateSignup,
  handler(signup, (request) => (
    [request.body, request.connection.remoteAddress]
  )),
);

router.post('/signin',
  handler(signin, (request) => (
    [request.body.email, request.body.password]
  )),
);

export default router;