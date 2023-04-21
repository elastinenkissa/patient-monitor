import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import { Patient } from '@/models/patient';
import { Company } from '@/models/company';
import { User } from '@/models/user';

import { connectDatabase } from '@/util/connectDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const token =
      req.headers.authorization?.startsWith('bearer') &&
      req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    try {
      await connectDatabase();

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      const user = await User.findById(decodedToken);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized.' });
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
      await user.save();

      const company = await Company.findById(user.company);

      if (!company) {
        return res.status(404).json({ message: 'Invalid company.' });
      }

      company.patients = company.patients.concat(patient.id);
      await company.save();

      return res.status(201).json({ message: 'Patient added successfully.' });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.method === 'GET') {
    const { companyId, doctorId } = req.query;

    if (companyId !== 'undefined') {
      try {
        await connectDatabase();

        const company = await Company.findById(companyId).populate('patients');

        if (!company) {
          return res.status(404).json({ message: 'Company not found.' });
        }

        return res.status(200).json(company.patients);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }

    if (doctorId !== 'undefined') {
      try {
        await connectDatabase();

        const doctor = await User.findById(doctorId).populate('patients');

        if (!doctor) {
          return res.status(404).json({ message: 'Doctor not found.' });
        }

        return res.status(200).json(doctor.patients);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }

    res.status(404).json({ message: 'No patients found.' });
  }
};

export default handler;
