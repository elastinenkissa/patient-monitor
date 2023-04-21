import { FC } from 'react';
import { Visibility } from '@mui/icons-material';
import Link from 'next/link';

import HealthRating from '../HealthRating/HealthRating';

import { PatientType } from '@/models/patient';

import classes from './PatientItem.module.css';

interface PatientItemProps {
  patient: PatientType;
}

const PatientItem: FC<PatientItemProps> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.flexItemOne}>
        <p>{props.patient.name}</p>
      </div>
      <div className={classes.flexItemTwo}>
        <HealthRating healthRating={props.patient.healthRating} />
      </div>
      <Link
        href={`/patients/${props.patient.id}`}
        className={classes.link + ' ' + classes.flexItem}
      >
        <Visibility />
      </Link>
    </div>
  );
};

export default PatientItem;
