import { createUser, getUser } from './authService';
import { compare } from 'bcryptjs';

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
 * There's a weird case that's not handled here. The
 * case where the email is not found.
 *
 * Here's the thing, this route *explicitly* requires a token,
 * said token stores an email, from a registered user. If he's
 * here then the email *obviously* exists.
 *
 * TODO: This now needs to include a new field, "role".
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