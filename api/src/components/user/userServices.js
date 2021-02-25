import { user } from '@models';
import { genSalt, hash } from 'bcryptjs';

/**
 * Only for two cases (password, user_name).
 */
const updateField = async (field, newValue, userID) => {
  if (field === 'password') {
    const salt = await genSalt(10);
    const hashedPassword = await hash(newValue, salt);

    await user.update({ password: hashedPassword }, { where: { id: userID } });
  }
  else {
    await user.update({ user_name: newValue }, { where: { id: userID } });
  }

  return true;
};

export {
  updateField,
};