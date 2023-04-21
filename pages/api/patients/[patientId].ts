import { NextApiRequest, NextApiResponse } from 'next';

import { Patient } from '@/models/patient';

import { connectDatabase } from '@/util/connectDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      await connectDatabase();

      const patient = await Patient.findById(req.query.patientId).populate('entries');

      if (!patient) {
        return res.status(404).json({ message: 'Patient not found.' });
      }

      return res.status(200).json(patient);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default handler;
