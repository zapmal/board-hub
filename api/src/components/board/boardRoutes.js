import { Router } from 'express';
import {
  newBoard,
  getBoards,
  getFavoriteBoards,
  toggleFavoriteBoard,
  deleteBoard,
  getBoard,
} from './boardController';
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
  handler(newBoard, (request) => (
    [
      request.body.userID,
      request.body.name,
      request.body.description,
      request.body.isFavorite,
    ]
  )),
);

router.get(`${ROUTE_PREFIX}/all`,
  handler(getBoards, (request, response) => (
    [response.locals.user.id, response]
  )),
);

router.get(`${ROUTE_PREFIX}/favorites`,
  handler(getFavoriteBoards, (request, response) => (
    [response.locals.user.id, response]
  )),
);

router.put(`${ROUTE_PREFIX}/:id/toggle-favorite`,
  handler(toggleFavoriteBoard, (request, response) => (
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