import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

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

    const user = await User.findOne({
      identificationNumber: req.body.socialNumber
    }).populate('company', '-patients');

    if (!user) {
      throw new Error('Employee not found.');
    }

    const token = jwt.sign(user.id, process.env.JWT_SECRET!);

    res.status(200).json({ ...user.toJSON(), token });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}
