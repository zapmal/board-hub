import { Router } from 'express';
import { getLists, putOrder } from './listsController';
import { checkToken } from '@middlewares/validators/auth';
import { validateOrderUpdate } from '@middlewares/validators/lists';
import handler from '@utils/controllerHandler';

const router = Router();
const ROUTE_PREFIX = '/lists';

router.use(checkToken);

router.get(`${ROUTE_PREFIX}/all`,
  handler(getLists, (request, response) => (
    [request.body.boardId, response]
  )),
);

/**
 * This needs validation with Joi.
 *
 * boardId: 77,
 *
 * previousListId: 43,
 * previousListOrder: 2,
 * movedListId: 44,
 * movedListOrder: 3,
 */
router.put(`${ROUTE_PREFIX}/order`,
  validateOrderUpdate,
  handler(putOrder, (request) => (
    [
      request.body.previousListId,
      request.body.previousListOrder,
      request.body.movedListId,
      request.body.movedListOrder,
    ]
  )),
);

export default router;