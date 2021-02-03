import { Router } from 'express';
import handler from '@libs/controllerHandler';
import { signin, signup } from './authController';

const router = Router();

router.post('/signin',
  handler(signin, (request, response) => (
    [request.body.username, request.body.password]),
  ),
);

export default router;

