import { NextApiRequest, NextApiResponse } from 'next';

import { Patient } from '@/models/patient';
import { Company } from '@/models/company';

import { connectDatabase } from '@/util/connectDatabase';
import { getLoggedInUser } from '@/util/pseudoMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await connectDatabase();

      const user = await getLoggedInUser(req);

      const existingPatients = await Patient.find({
        identificationNumber: req.body.socialNumber
      });

      const currentCompanyPatients = (await user.populate('company')).company
        .patients;

      if (
        existingPatients.find((patient) =>
          currentCompanyPatients.includes(patient.id)
        )
      ) {
        return res
          .status(400)
          .json({ message: 'Patient is already registered in this company.' });
      }

      const patient = await Patient.create({
        name: req.body.name,
        identificationNumber: req.body.socialNumber,
        occupation: req.body.occupation,
        gender: req.body.gender,
        healthRating: req.body.healthRating,
        entries: [],
        diagnosis: [],
        prescriptions: []
      });

      user.patients = user.patients.concat(patient.id);
      if (user.recentPatients.length === 3) {
        user.recentPatients.shift();
      }
      user.recentPatients = user.recentPatients.concat(patient.id);
      await user.save();

      const company = await Company.findById(user.company);

      if (!company) {
        return res.status(404).json({ message: 'Invalid company.' });
      }

      company.patients = company.patients.concat(patient.id);
      await company.save();

      return res.status(201).json(patient);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default handler;
