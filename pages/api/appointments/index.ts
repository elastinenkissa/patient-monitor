import { NextApiRequest, NextApiResponse } from 'next';

import { Appointment } from '@/models/appointment';
import { Patient } from '@/models/patient';

import { getLoggedInUser } from '@/util/pseudoMiddleware';
import { connectDatabase } from '@/util/connectDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await connectDatabase();

      const user = await getLoggedInUser(req);

      const patient = await Patient.findById(req.body.patientId);

      const currentDate = new Date();

      if (currentDate > new Date(req.body.scheduled)) {
        return res
          .status(400)
          .json({ message: 'You cannot schedule appointments in the past.' });
      }

      const newAppointment = await Appointment.create({
        patientName: req.body.patientName,
        patient: patient && patient.id,
        scheduled: req.body.scheduled,
        doctor: user.id
      });

      if (!newAppointment) {
        return res
          .status(400)
          .json({ message: 'Failed to make an appointment.' });
      }

      res.status(201).json(newAppointment);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default handler;
