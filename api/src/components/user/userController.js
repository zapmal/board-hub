import { compare } from 'bcryptjs';
import {
  updateUsername,
  updatePassword,
  getCurrentUserPassword,
} from './userServices';

/**
 * Using <put> because there was a naming conflict
 * with the service.
 */
const putUsername = async (userID, newUsername) => {
  await updateUsername(newUsername, userID);

  return {
    message: `Tu nombre de usuario ha sido cambiado a ${newUsername} exitosamente.`,
  };
};

const putPassword = async (userID, currentPassword, newPassword, response) => {
  const storedPassword = await getCurrentUserPassword(userID);

  const oldPasswordsMatch = await compare(currentPassword, storedPassword);

  if (oldPasswordsMatch) {
    await updatePassword(newPassword, userID);
    return { message: 'Contraseña actualizada exitosamente.' };
  }
  else {
    response.status(400);
    return { message: 'La contraseña (actual) es incorrecta.' };
  }
};

export {
  putUsername,
  putPassword,
};