import { updateField } from './userServices';

const updateUsername = async (userID, newUsername) => {
  await updateField('user_name', newUsername, userID);

  return {
    message: `Tu nombre de usuario ha sido cambiado a ${newUsername} exitosamente.`,
  };
};

const updatePassword = async (userID, newPassword) => {
  await updateField('password', newPassword, userID);

  return { message: 'Contraseña actualizada exitosamente.' };
};

export {
  updateUsername,
  updatePassword,
};