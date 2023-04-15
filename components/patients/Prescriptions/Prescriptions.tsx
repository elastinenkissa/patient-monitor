import { FC } from 'react';

import { Patient } from '@/types/patient';
import MedicalRecords from '../MedicalRecords/MedicalRecords';

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
