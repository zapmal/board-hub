import { Router } from 'express';
import {
  newBoard,
  getBoards,
  getFavorites,
  toggleFavorite,
  deleteBoard,
  getBoard,
} from './boardsController';
import { checkToken } from '@middlewares/validators/auth';
import {
  validateNewBoard,
  checkDuplicatedBoardName,
} from '@middlewares/validators/boards';
import handler from '@utils/controllerHandler';

const router = Router();
const ROUTE_PREFIX = '/b';

router.use(checkToken);

router.post(`${ROUTE_PREFIX}/new`,
  [
    validateNewBoard,
    checkDuplicatedBoardName,
  ],
  handler(newBoard, (request, response) => (
    [
      {
        userID: response.locals.user.id,
        name: request.body.name,
        description: request.body.description,
        isFavorite: request.body.isFavorite,
      },
      response,
    ]
  )),
);

router.get(`${ROUTE_PREFIX}/all`,
  handler(getBoards, (_, response) => (
    [response.locals.user.id, response]
  )),
);

router.get(`${ROUTE_PREFIX}/favorites`,
  handler(getFavorites, (_, response) => (
    [response.locals.user.id, response]
  )),
);

router.put(`${ROUTE_PREFIX}/:id/toggle-favorite`,
  handler(toggleFavorite, (request, response) => (
    [response.locals.user.id, request.params.id, response]
  )),
);

router.delete(`${ROUTE_PREFIX}/:id`,
  handler(deleteBoard, (request, response) => (
    [request.params.id, response]
  )),
);

router.get(`${ROUTE_PREFIX}/:id`,
  handler(getBoard, (request, response) => (
    [request.params.id, response]
  )),
);

export default router;