import { FC, ReactNode } from 'react';

import HealthRating from '../HealthRating/HealthRating';

import { Patient } from '@/types/patient';

import classes from './PatientHeader.module.css';

interface PatientHeaderProps {
  patient: Patient;
  genderSymbol: ReactNode;
}

const PatientHeader: FC<PatientHeaderProps> = (props) => {
  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.header}>
          <p>{props.patient.name}</p>
          <p>{props.genderSymbol}</p>
        </h2>
        <h5>SN: {props.patient.identificationNumber}</h5>
        <h5>{props.patient.occupation}</h5>
      </div>
      <div>
        <HealthRating healthRating={props.patient.healthRating} />
      </div>
    </div>
  );
};

export default PatientHeader;
