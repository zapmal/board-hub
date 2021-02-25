import { user } from '@models';
import { genSalt, hash } from 'bcryptjs';

const updateUsername = async (userID, newUsername) => {
  return { userID, refactor: 'go brr' };
};

const updatePassword = async (userID, newPassword) => {
};

export {
  updateUsername,
  updatePassword,
};