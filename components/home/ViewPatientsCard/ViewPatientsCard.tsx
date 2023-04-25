import { FC, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, History } from '@mui/icons-material';
import { CSSTransition } from 'react-transition-group';

import Card from '@/components/shared/Card/Card';
import PatientList from '@/components/patients/PatientList/PatientList';

import { UserType } from '@/models/user';
import { PatientType } from '@/models/patient';

import classes from './ViewPatientsCard.module.css';
import { CircularProgress } from '@mui/material';

interface ViewPatientsCardProps {
  user: UserType | undefined;
  patients: Array<PatientType>;
}

const ViewPatientsCard: FC<ViewPatientsCardProps> = (props) => {
  const [zoom, setZoom] = useState<boolean>(false);

  return (
    <Card className={classes.patients}>
      <Link
        href={`/patients?doctor=${props.user?.id}`}
        className={classes.viewPatients}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <h4>View your patients</h4>
        <CSSTransition timeout={500} in={zoom} classNames="zoom">
          <ChevronRight className={classes.arrow} />
        </CSSTransition>
      </Link>
      <div className={classes.recentPatients}>
        <div className={classes.recentPatientsHeader}>
          <p>Recent patients</p>
          <History />
        </div>
        {props.patients ? (
          <PatientList patients={props.patients} />
        ) : (
          <CircularProgress />
        )}
      </div>
    </Card>
  );
};
export default ViewPatientsCard;
