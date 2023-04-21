import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';

import { User } from '@/models/user';

export const getLoggedInUser = async (req: NextApiRequest) => {
  const token =
    req.headers.authorization?.startsWith('bearer') &&
    req.headers.authorization.split(' ')[1];

  if (!token) {
    throw new Error('Invalid token.');
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
  const user = await User.findById(decodedToken);

  if (!user) {
    throw new Error('Unauthorized.');
  }
  
  return user;
};
