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

const signin = async (email, password) => {
  const user = await getUser(email);

  if (!user) {
    return {
      token: null,
      message: 'User does not exist.',
    };
  }

  const passwordsMatch = await compare(password, user.password);

  if (passwordsMatch) {
    const token = await getToken(email);

    return token;
  }
  else {
    return {
      token: null,
      message: 'Invalid password.',
    };
  }
};

export {
  signup,
  signin,
};