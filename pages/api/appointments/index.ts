import { NextApiRequest, NextApiResponse } from 'next';

import { Appointment } from '@/models/appointment';
import { Patient } from '@/models/patient';

import { getLoggedInUser } from '@/util/pseudoMiddleware';
import { connectDatabase } from '@/util/connectDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      await connectDatabase();

      const user = await getLoggedInUser(req);

      const appointments = await Appointment.find({ doctor: user.id }).populate('patient');
      

      if (!appointments) {
        return res.status(404).json({ message: 'No appointments found' });
      }

      return res.status(200).json(appointments);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  if (req.method === 'POST') {
    try {
      await connectDatabase();

      const user = await getLoggedInUser(req);

      const patient = await Patient.findById(req.body.patientId);

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
