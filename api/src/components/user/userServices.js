import { user } from '@models';
import { genSalt, hash } from 'bcryptjs';

const updateUsername = async (newUsername, userID) => {
  await user.update({ user_name: newUsername }, { where: { id: userID } });
};

const updatePassword = async (newPassword, userID) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(newPassword, salt);

  await user.update({ password: hashedPassword }, { where: { id: userID } });
};

const getCurrentUserPassword = async (userID) => {
  const { password } = await user.findOne({ where: { id: userID } });

  return password;
};

export {
  updateUsername,
  updatePassword,
  getCurrentUserPassword,
};