import { NextApiRequest, NextApiResponse } from 'next';

import { Appointment } from '@/models/appointment';
import { Patient } from '@/models/patient';

import { getLoggedInUser } from '@/util/pseudoMiddleware';
import { connectDatabase } from '@/util/connectDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      await connectDatabase();
      await getLoggedInUser(req);

      const patient = await Patient.findById(req.query.patientId);

      if (!patient) {
        return res.status(404).json({ message: 'Patient not found.' });
      }

      await Appointment.findByIdAndUpdate(
        req.query.appointmentId,
        {
          patient: patient.id
        },
        { new: true }
      );

      return res
        .status(201)
        .json({ message: 'Appointment updated successfully.' });
    } catch (error: any) {
      console.log('i here now');

      return res.status(400).json({ message: error.message });
    }
  }
};

export default handler;
