import { FC } from 'react';
import { Visibility } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';

import HealthRating from '../HealthRating/HealthRating';

import { PatientType } from '@/models/patient';

import classes from './PatientItem.module.css';

interface PatientItemProps {
  patient: PatientType;
}

const PatientItem: FC<PatientItemProps> = (props) => {
  const router = useRouter();

  return (
    <div className={classes.container}>
      <div
        className={classes.flexItemOne}
        style={{
          wordBreak: router.pathname === '/home' ? 'normal' : 'break-all',
          flexBasis: router.pathname === '/home' ? '20%' : '30%'
        }}
      >
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
