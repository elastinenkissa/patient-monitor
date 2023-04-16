import { FC } from 'react';

import MedicalRecords from '../MedicalRecords/MedicalRecords';

import { Patient } from '@/types/patient';

interface PrescriptionsProps {
  patient: Patient;
}

const Prescriptions: FC<PrescriptionsProps> = (props) => {
  return (
    <MedicalRecords records={props.patient.prescriptions}>
      Prescriptions
    </MedicalRecords>
  );
};

export default Prescriptions;
