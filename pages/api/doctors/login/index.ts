import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '@/models/user';

import { connectDatabase } from '@/util/connectDatabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: 'Only POST requests are allowed on this route.' });
  }

  try {
    await connectDatabase();

    const user = await User.findOne({ username: req.body.username }).populate(
      'company',
      '-patients'
    );

    if (!user) {
      return res.status(404).json({ message: 'Invalid username.' });
    }

    const socialNumberIsMatching = await bcrypt.compare(
      req.body.socialNumber,
      user?.identificationNumber
    );

    if (!socialNumberIsMatching) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    const token = jwt.sign(user.id, process.env.JWT_SECRET!);

    res.status(200).json({ ...user.toJSON(), token });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}
