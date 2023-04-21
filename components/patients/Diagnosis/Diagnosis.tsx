import { FC } from 'react';

import MedicalRecords from '../MedicalRecords/MedicalRecords';

import { PatientType } from '@/models/patient';

interface DiagnosisProps {
  patient: PatientType; 
}

const Diagnosis: FC<DiagnosisProps> = (props) => {
  return (
    <MedicalRecords records={props.patient.diagnosis}>Diagnosis</MedicalRecords>
  );
};

export default Diagnosis;
