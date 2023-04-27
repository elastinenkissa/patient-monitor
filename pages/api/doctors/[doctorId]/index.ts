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

  if (req.method === 'DELETE') {
    try {
      await connectDatabase();

      const user = await getLoggedInUser(req);

      await User.findByIdAndDelete(doctor.id);

      return res
        .status(200)
        .json({ message: `Employee removed from ${user.company.name}.` });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.method === 'PATCH') {
    try {
      await connectDatabase();

      const patient = await Patient.findById(req.query.patientId);

      if (!patient) {
        throw new Error('Patient does not exist.');
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

  if (req.method === 'PUT') {
    try {
      await connectDatabase();

      const user = await getLoggedInUser(req);

      if (user.isAdministrator && (doctor.isAdministrator || doctor.isOwner)) {
        throw new Error('Unauthorized.');
      }

      doctor.name = req.body.name;
      doctor.isAdministrator = req.body.isAdministrator;
      await doctor.save();

      return res
        .status(200)
        .json(doctor);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default handler;
