import { FC } from 'react';

import Card from '@/components/shared/Card/Card';

import classes from './UpcomingAppointments.module.css'

const UpcomingAppointments: FC = (props) => {
  return <Card className={classes.container}>Upcoming appointments</Card>;
};

export default UpcomingAppointments;
