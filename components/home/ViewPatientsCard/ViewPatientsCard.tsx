import { FC, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, History } from '@mui/icons-material';
import { CSSTransition } from 'react-transition-group';

import Card from '@/components/shared/Card/Card';
import PatientList from '@/components/patients/PatientList/PatientList';

import { User } from '@/types/user';
import { Patient } from '@/types/patient';

import classes from './ViewPatientsCard.module.css';

interface ViewPatientsCardProps {
  user: User | undefined;
  patients: Array<Patient>;
}

const ViewPatientsCard: FC<ViewPatientsCardProps> = (props) => {
  const [zoom, setZoom] = useState<boolean>(false);

  return (
    <Card className={classes.patients}>
      <Link
        href={`/patients?doctor=${props.user!.id}`}
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
        <PatientList patients={props.patients} />
      </div>
    </Card>
  );
};
export default ViewPatientsCard;
