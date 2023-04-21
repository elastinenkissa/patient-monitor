import { NextApiRequest, NextApiResponse } from 'next';

import { connectDatabase } from '@/util/connectDatabase';
import { getLoggedInUser } from '@/util/pseudoMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      await connectDatabase();

      const user = await getLoggedInUser(req);

      const recentPatients = (
        await user.populate(
          'recentPatients',
          '-identificationNumber -occupation -gender -diagnosis -prescriptions -entries'
        )
      ).recentPatients;

      return res.status(200).json(recentPatients);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default handler;
