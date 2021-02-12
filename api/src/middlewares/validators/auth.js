import validate from '@libs/schemas/validate';
import {
  signupSchema,
  signinSchema,
} from '@libs/schemas/authSchemas';
import logger from '@libs/logging/logger';

import dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';
import { user } from '@models';

dotenv.config();

const validateSignup = (request, response, next) => {
  const { value, error } = validate(signupSchema, request.body);

  if (error) {
    const errors = error.details.map(({ message }) => message).join(', ');

    response.status(400).json({ message: errors });
    logger.error(errors);
  }
  else {
    request.body = value;
    next();
  }
};

const validateSignin = (request, response, next) => {
  const { value, error } = validate(signinSchema, request.body, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    const errors = error.details.map(({ message }) => message).join(', ');

    response.status(400).json({ message: errors });
    logger.error(errors);
  }
  else {
    request.body = value;
    next();
  }
};

const checkDuplicatedUser = async (request, response, next) => {
  const { username, email } = request.body;

  try {
    const emailAlreadyExists = await user.findOne({ where: { email } });

    if (emailAlreadyExists) {
      response
        .status(400)
        .json({
          message: 'Ese correo ya está en uso.',
        });
    }

    const usernameAlreadyExists = await user.findOne({ where: { user_name: username } });

    if (usernameAlreadyExists) {
      response
        .status(400)
        .json({
          message: 'Ese nombre de usuario ya está en uso.',
        });
    }
    next();

  }
  catch (error) {
    response.status(500).json({ message: 'Hubo un error de nuestro lado, intenta otra vez.' });
    logger.error(error.message);
  }
};

const checkToken = async (request, response, next) => {
  const authHeader = request.headers.authorization;
  const SECRET = process.env.JWT_SECRET;

  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      response.status(401).json({ message: 'Token inválido o no enviado.' });
    }

    const token = authHeader.split(' ')[1];
    const { email } = verify(token, SECRET);
    response.locals.email = email;

    const tokenOwner = await user.findOne({ where: { email } });

    if (!tokenOwner) {
      response
        .status(404)
        .json({
          message: 'El token que provees no está asociado a ninguna cuenta.',
        });
    }

    next();
  }
  catch (error) {
    console.log(error.name);
    if (error.name === 'TokenExpiredError') {
      response
        .status(500)
        .json({
          message: 'Su sesión ha expirado, por favor, inicie sesión otra vez.',
        });
    }
    else {
      response
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