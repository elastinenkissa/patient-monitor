import { FC } from 'react';

import PatientItem from './PatientItem/PatientItem';

import { PatientType } from '@/models/patient';

interface PatientListProps {
  patients: Array<PatientType>;
}

const PatientList: FC<PatientListProps> = (props) => {
  return (
    <div>
      {!props.patients || props.patients.length === 0 ? (
        <h3>No patients</h3>
      ) : (
        props.patients.map((patient) => (
          <PatientItem key={patient.id} patient={patient} />
        ))
      )}
    </div>
  );
};

export default PatientList;
