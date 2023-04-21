import { FC } from 'react';

import MedicalRecords from '../MedicalRecords/MedicalRecords';

import { PatientType } from '@/models/patient';

interface PrescriptionsProps {
  patient: PatientType;
}

const Prescriptions: FC<PrescriptionsProps> = (props) => {
  return (
    <MedicalRecords records={props.patient.prescriptions}>
      Prescriptions
    </MedicalRecords>
  );
};

export default Prescriptions;
