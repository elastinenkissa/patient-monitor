import { NextApiRequest, NextApiResponse } from 'next';

import { Entry } from '@/models/entry';

import { connectDatabase } from '@/util/connectDatabase';
import { getLoggedInUser } from '@/util/pseudoMiddleware';

import { Patient } from '@/models/patient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await connectDatabase();

      const user = await getLoggedInUser(req);

      const newEntry = await Entry.create({
        content: req.body.content,
        by: user.name,
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
        return res.status(404).json({ message: 'Patient does not exist.' });
      }

      user.patients = user.patients.concat(patient.id);

      const existingPatient = user.recentPatients.find(
        (foundPatient) => foundPatient.toString() === patient.id
      );

      if (!existingPatient) {

        if (user.recentPatients.length === 3) {
          user.recentPatients.shift();
        }
        user.recentPatients = user.recentPatients.concat(patient.id);
      }

      await user.save();

      patient.entries = patient.entries.concat(newEntry.id);
      patient.diagnosis = patient.diagnosis.concat(req.body.addedDiagnosis);
      patient.prescriptions = patient.prescriptions.concat(
        req.body.addedPrescriptions
      );
      req.body.removingDiagnosis.map((diagnosis: string) => {
        patient.diagnosis = patient.diagnosis.filter(
          (diag) => diag !== diagnosis
        );
      });
      req.body.removingPrescriptions.map((prescription: string) => {
        patient.prescriptions = patient.prescriptions.filter(
          (prescr) => prescr !== prescription
        );
      });
      patient.healthRating = req.body.newHealthRating;
      await patient.save();

      const newPatient = await patient.populate('entries');

      return res.status(201).json(newPatient);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default handler;
