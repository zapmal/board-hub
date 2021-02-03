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

  console.log({ boundParameters });
  try {
    const result = await promise(...boundParameters);
    return response.json(result || { message: 'Custom message here!' });
  }
  catch (error) {
    return response.status(500).json(error);
    // log shit
  }
};

export default handler;