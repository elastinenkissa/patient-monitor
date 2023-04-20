import { FC } from 'react';

import PatientItem from '../PatientItem/PatientItem';

import { Patient } from '@/models/patient';

import classes from './PatientList.module.css';

interface PatientListProps {
  patients: Array<Patient>;
}

const PatientList: FC<PatientListProps> = (props) => {
  return (
    <div className={classes.container}>
      {props.patients.map((patient) => (
        <PatientItem key={patient.id} patient={patient} />
      ))}
    </div>
  );
};

export default PatientList;
