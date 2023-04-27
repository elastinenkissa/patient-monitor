import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import { User } from '@/models/user';
import { Company } from '@/models/company';

import { connectDatabase } from '@/util/connectDatabase';
import { getLoggedInUser } from '@/util/pseudoMiddleware';

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

    const hashedSN = await bcrypt.hash(req.body.socialNumber, 10);

    if (req.body.type === 'create') {
      const user = await getLoggedInUser(req);

      const employee = await User.create({
        name: req.body.fullName,
        username: req.body.username,
        identificationNumber: hashedSN,
        company: user.company,
        isAdministrator: user.isOwner && req.body.isAdministrator,
        patients: [],
        recentPatients: [],
        imageUrl:
          'https://th.bing.com/th/id/R.2212e2e523684c91bb6ade690d9e3fc0?rik=jKD89fg3ekClvw&pid=ImgRaw&r=0'
      });

      return res.status(201).json(employee);
    }

    if (!req.body.companyName) {
      throw new Error('Company name missing.');
    }

    const newCompany = await Company.create({ name: req.body.companyName });

    const user = await User.create({
      name: req.body.fullName,
      username: req.body.username,
      identificationNumber: hashedSN,
      company: newCompany.id,
      isOwner: true,
      patients: [],
      recentPatients: [],
      imageUrl:
        'https://th.bing.com/th/id/R.2212e2e523684c91bb6ade690d9e3fc0?rik=jKD89fg3ekClvw&pid=ImgRaw&r=0'
    });

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
