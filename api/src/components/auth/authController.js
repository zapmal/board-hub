import { createUser, getToken, getUser } from './authService';
import { compare } from 'bcryptjs';

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

export {
  signup,
  signin,
};