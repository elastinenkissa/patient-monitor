import { FC } from 'react';
import Link from 'next/link';
import { ChevronRight, History } from '@mui/icons-material';

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
  return (
    <Card className={classes.patients}>
      <Link
        href={`/patients?doctor=${props.user!.id}`}
        className={classes.viewPatients}
      >
        <h4>View your patients</h4>
        <ChevronRight />
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
