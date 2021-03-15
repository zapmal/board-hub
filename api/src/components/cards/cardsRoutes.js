import { Router } from 'express';
import { newCard, deleteCard, getCard } from './cardsController';
import { checkToken } from '@middlewares/validators/auth';
import { validateNewCard, checkCardOwner } from '@middlewares/validators/cards';
import handler from '@utils/controllerHandler';

const router = Router();
const ROUTE_PREFIX = '/cards';

router.use(checkToken);

router.post(`${ROUTE_PREFIX}/new`,
  validateNewCard,
  handler(newCard, (request) => (
    [request.body.title, request.body.listId]
  )),
);

router.delete(`${ROUTE_PREFIX}/:id`,
  checkCardOwner,
  handler(deleteCard, (request, response) => (
    [request.params.id, response]
  )),
);

router.get(`${ROUTE_PREFIX}/:id`,
  checkCardOwner,
  handler(getCard, (request, response) => (
    [request.params.id, response]
  )),
);

export default router;