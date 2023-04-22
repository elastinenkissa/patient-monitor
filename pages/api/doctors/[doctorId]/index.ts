import { NextApiRequest, NextApiResponse } from 'next';

import { connectDatabase } from '@/util/connectDatabase';
import { getLoggedInUser } from '@/util/pseudoMiddleware';
import { Patient } from '@/models/patient';
import { User } from '@/models/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const doctor = await User.findById(req.query.doctorId);

  if (!doctor) {
    return res.status(404).json({ message: 'Doctor does not exist.' });
  }

  if (req.method === 'PATCH') {
    const user = await getLoggedInUser(req);
  }

  if (req.method === 'DELETE') {
    try {
      await connectDatabase();

      const patient = await Patient.findById(req.query.patientId);

      if (!patient) {
        return res.status(404).json({ message: 'Patient does not exist.' });
      }

      doctor.patients = doctor.patients.filter(
        (existingPatient) => existingPatient.toString() !== patient.id
      );

      doctor.recentPatients = doctor.recentPatients.filter(
        (existingPatient) => existingPatient.toString() !== patient.id
      );
      await doctor.save();

      return res.status(201).json({ message: 'Patient dismissed.' });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default handler;
