import { FC } from 'react';
import Link from 'next/link';
import { ChevronRight, History } from '@mui/icons-material';

import Card from '@/components/shared/Card/Card';

import { User } from '@/types/user';

import classes from './ViewPatientsCard.module.css';

interface ViewPatientsCardProps {
  user: User | undefined;
}

const ViewPatientsCard: FC<ViewPatientsCardProps> = (props) => {
  return (
    <Card className={classes.patients}>
      <Link
        href={`/patients/${props.user!.id}`}
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
        <div>{/* list of recent patients from another component */}</div>
      </div>
    </Card>
  );
};
export default ViewPatientsCard;
