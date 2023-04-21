import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import { Entry } from '@/models/entry';
import { User } from '@/models/user';

import { connectDatabase } from '@/util/connectDatabase';
import { Patient } from '@/models/patient';

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

      const newEntry = await Entry.create({
        content: req.body.content,
        by: user.id,
        newHealthRating: req.body.newHealthRating,
        addedDiagnosis: req.body.addedDiagnosis,
        addedPrescriptions: req.body.addedPrescriptions,
        removingDiagnosis: req.body.removingDiagnosis,
        removingPrescriptions: req.body.removingPrescriptions
      });

      if (!newEntry) {
        return res.status(400).json({ message: 'Failed to add new entry.' });
      }

      const patient = await Patient.findById(req.query.patientId);

      if (!patient) {
        return res.status(404).json({ message: 'Patient not found.' });
      }

      patient.entries = patient.entries.concat(newEntry.id);
      await patient.save();

      const entry = await newEntry.populate('by');

      return res.status(201).json(entry);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default handler;
