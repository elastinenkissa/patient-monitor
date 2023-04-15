import { FC, ReactNode } from 'react';

import classes from './PatientHeader.module.css';

import { Patient } from '@/types/patient';

interface PatientHeaderProps {
  patient: Patient;
  genderSymbol: ReactNode;
}

const PatientHeader: FC<PatientHeaderProps> = (props) => {
  return (
    <div>
      <h2 className={classes.header}>
        <p>{props.patient.name}</p>
        <p>{props.genderSymbol}</p>
      </h2>
      <h5>SN: {props.patient.identificationNumber}</h5>
      <h5>{props.patient.occupation}</h5>
    </div>
  );
};

export default PatientHeader;
