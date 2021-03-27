import validateRequest from '@utils/schemas/validate';
import logger from '@utils/logging';
import {
  signupSchema,
  signinSchema,
} from '@utils/schemas/authSchemas';

import { verify } from 'jsonwebtoken';
import { user } from '@models';

const validateSignup = (request, response, next) => {
  request.body = validateRequest(
    request.body,
    response,
    signupSchema,
    next,
    true,
  );
};

const validateSignin = (request, response, next) => {
  request.body = validateRequest(
    request.body,
    response,
    signinSchema,
    next,
    true,
    { abortEarly: false, allowUnknown: false },
  );
};

/**
 * Destructured properties have defaults to avoid crashes when
 * using this method for only one property.
 *
 * This can be done efficiently in production by creating the default user/email in
 * seeders and then storing said user in the .env.
 */
const checkDuplicatedUser = async (request, response, next) => {
  const { username = 'nullernull', email = 'null@null.com' } = request.body;

  try {
    const emailAlreadyExists = await user.findOne({ where: { email } });

    if (emailAlreadyExists) {
      return response
        .status(400)
        .json({
          message: 'Ese correo ya está en uso.',
        });
    }

    const usernameAlreadyExists = await user.findOne({ where: { user_name: username } });

    if (usernameAlreadyExists) {
      return response
        .status(400)
        .json({
          message: 'Ese nombre de usuario ya está en uso.',
        });
    }
    next();

  }
  catch (error) {
    logger.error(error.message);
    return response
      .status(500)
      .json({ message: 'Hubo un error de nuestro lado, intenta otra vez.' });
  }
};

const checkToken = async (request, response, next) => {
  const authHeader = request.headers.authorization;
  const SECRET = process.env.JWT_SECRET;

  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response
        .status(401)
        .json({ message: 'No estás autorizado a ver esta información.' });
    }

    const token = authHeader.split(' ')[1];
    const { email } = verify(token, SECRET);

    const tokenOwner = await user.findOne({ where: { email } });
    response.locals.user = tokenOwner;

    if (!tokenOwner) {
      return response
        .status(404)
        .json({
          message: 'El token que provees no está asociado a ninguna cuenta.',
        });
    }

    next();
  }
  catch (error) {
    if (error.name === 'TokenExpiredError') {
      return response
        .status(500)
        .json({
          message: 'Su sesión ha expirado, por favor, inicie sesión otra vez.',
        });
    }
    else {
      return response
        .status(500)
        .json({
          message: 'Hubo un error de nuestro lado, intenta otra vez.',
        });
    }
  }
};

export {
  validateSignin,
  validateSignup,
  checkDuplicatedUser,
  checkToken,
};
