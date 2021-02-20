import logger from './logging/logger';

/**
 * Handles controller execution and responds to user.
 * This way controllers are not attached to the API.
 * @param promise Controller Promise. I.E: getUser.
 * @param params [params, ...]. A function (req, res, next), all
 * of which are optional that maps our desired controller parameters.
 * I.E: (req) => [req.params.username, ...].
 */
const handler = (promise, params) => async (request, response, next) => {
  const boundParameters = params ? params(request, response, next) : [];

  try {
    const result = await promise(...boundParameters);
    return response.json(result || { message: 'OK' });
  }
  catch (error) {
    console.log(error);
    logger.error(error.message);
    return response.status(500).json(error.message);
  }
};

export default handler;