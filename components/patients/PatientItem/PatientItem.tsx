import { FC } from 'react';
import { Visibility } from '@mui/icons-material';
import Link from 'next/link';

import HealthRating from '../HealthRating/HealthRating';

import { Patient } from '@/models/patient';

import classes from './PatientItem.module.css';

interface PatientItemProps {
  patient: Patient;
}

const PatientItem: FC<PatientItemProps> = (props) => {
  return (
    <div className={classes.container}>
      <p>{props.patient.name}</p>
      <HealthRating healthRating={props.patient.healthRating} />
      <Link href={`/patients/${props.patient.id}`} className={classes.link}>
        <Visibility />
      </Link>
    </div>
  );
};

export default PatientItem;
