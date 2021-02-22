import dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';

dotenv.config();

const SECRET = process.env.JWT_SECRET;

const getToken = async (email) => {
  const token = sign({ email }, SECRET, { expiresIn: '90d' });

  return { token };
};

export default getToken;