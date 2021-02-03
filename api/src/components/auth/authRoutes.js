import { Router } from 'express';
import handler from '@libs/controllerHandler';
import { signup, signin } from './authController';

const router = Router();

router.post('/signup',
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