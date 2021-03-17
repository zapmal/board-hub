import { Router } from 'express';
import { getLists, putOrder } from './listsController';
import { checkToken } from '@middlewares/validators/auth';
import { validateOrderUpdate, checkListsOwner } from '@middlewares/validators/lists';
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
  validateOrderUpdate,
  handler(putOrder, (request) => (
    [
      request.body.sourceListId,
      request.body.sourceListOrder,
      request.body.destinationListId,
      request.body.destinationListOrder,
    ]
  )),
);

export default router;