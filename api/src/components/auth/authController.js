import { createUser, getUser } from './authService';
import { compare, decode } from 'bcryptjs';

import getToken from '@libs/getToken';

const signup = async (data, ip) => {
  const {
    fullname,
    username,
    password,
    email,
  } = data;

  const userToken = await createUser(fullname, username, password, email, ip);

  return userToken;
};

const signin = async (email, password, response) => {
  const user = await getUser(email);

  if (!user) {
    return response
      .status(400)
      .json({ message: 'No existe un usuario con ese email.' });
  }

  const passwordsMatch = await compare(password, user.password);

  if (passwordsMatch) {
    const token = await getToken(email);

    return token;
  }
  else {
    return response
      .status(400)
      .json({ message: 'Contraseña incorrecta.' });
  }
};

/**
 * Gotta handle that 'edge-case' where the email is not found.
 * But it'd be weird, this route is authenticated, if he's here
 * the email *obviously* exists.
 */
const getMe = async (email) => {
  const {
    id,
    full_name,
    user_name,
    email: foundEmail,
  } = await getUser(email);

  const user = {
    id,
    fullname: full_name,
    username: user_name,
    email: foundEmail,
  };

  return user;
};

export {
  signup,
  signin,
  getMe,
};