import { NextApiRequest, NextApiResponse } from 'next';

import { Appointment } from '@/models/appointment';

import { getLoggedInUser } from '@/util/pseudoMiddleware';
import { connectDatabase } from '@/util/connectDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      await connectDatabase();
      await getLoggedInUser(req);
      
      await Appointment.findByIdAndUpdate(req.query.appointmentId, {
        patient: req.body.patientId
      });

      return res
        .status(201)
        .json({ message: 'Successfully updated appointment.' });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default handler;
