import { Router } from 'express';
import { getLists } from './listsController';
import { checkToken } from '@middlewares/validators/auth';
import handler from '@utils/controllerHandler';

const router = Router();
const ROUTE_PREFIX = '/lists';

router.use(checkToken);

router.get(`${ROUTE_PREFIX}/all`,
  handler(getLists, (_, response) => (
    [response.locals.user.id, response]
  )),
);

export default router;