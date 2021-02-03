import { createUser, getToken, getUser } from './authService';
import { compare } from 'bcryptjs';

const signup = async (data, ip) => {
  const {
    fullname,
    username,
    password,
    // confirmedPassword,
    email,
  } = data;

  const userToken = await createUser(fullname, username, password, email, ip);

  return userToken;
};

const signin = async (email, password) => {
  const user = await getUser(email);

  if (!user) {
    return 'User does not exist.';
  }

  const passwordsMatch = await compare(password, user.password);

  if (passwordsMatch) {
    const token = await getToken(email);

    return token;
  }
  else {
    return 'Password does not match.';
    // return null as token or thing like "not found"
  }
};

export {
  signup,
  signin,
};