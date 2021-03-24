import { Router } from 'express';
import { getLists, putOrder } from './listsController';
import { checkToken } from '@middlewares/validators/auth';
import { checkListsOwner } from '@middlewares/validators/lists';
import handler from '@utils/controllerHandler';

const router = Router();
const ROUTE_PREFIX = '/lists';

router.use(checkToken);
router.use(checkListsOwner);

router.get(`${ROUTE_PREFIX}/all`,
  handler(getLists, (request, response) => (
    [request.query.boardId, response]
  )),
);

router.put(`${ROUTE_PREFIX}/order`,
  handler(putOrder, (request) => (
    [
      request.body.newOrder,
      request.body.isLongDrag,
    ]
  )),
);

export default router;
