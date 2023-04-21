import { FC } from 'react';

import PatientItem from '../PatientItem/PatientItem';

import { PatientType } from '@/models/patient';

import classes from './PatientList.module.css';

interface PatientListProps {
  patients: Array<PatientType>;
}

const PatientList: FC<PatientListProps> = (props) => {
  return (
    <div className={classes.container}>
      {!props.patients || props.patients.length === 0 ? (
        <h1>No patients</h1>
      ) : (
        props.patients.map((patient) => (
          <PatientItem key={patient.id} patient={patient} />
        ))
      )}
    </div>
  );
};

export default PatientList;
