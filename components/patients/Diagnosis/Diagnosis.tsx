import { FC } from 'react';

import MedicalRecords from '../MedicalRecords/MedicalRecords';

import { Patient } from '@/types/patient';

interface DiagnosisProps {
  patient: Patient;
}

const Diagnosis: FC<DiagnosisProps> = (props) => {
  return (
    <MedicalRecords records={props.patient.diagnosis}>Diagnosis</MedicalRecords>
  );
};

export default Diagnosis;
