import { NextApiRequest, NextApiResponse } from 'next';

import { User } from '@/models/user';
import { Company } from '@/models/company';
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

    const newCompany = await Company.create({ name: req.body.companyName });
    await User.create({
      name: req.body.fullName,
      identificationNumber: req.body.socialNumber,
      company: newCompany.id,
      isOwner: true,
      patients: []
    });

    res
      .status(201)
      .json({ message: 'User and company registered succesfully.' });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}
