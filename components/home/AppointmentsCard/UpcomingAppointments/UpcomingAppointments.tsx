import { FC, useState, useContext, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

import Card from '@/components/shared/Card/Card';
import UpcomingAppointmentItem from './UpcomingAppointmentItem/UpcomingAppointmentItem';

import { AppointmentType } from '@/models/appointment';

import { UserContext, UserContextType } from '@/context/UserContext';

import classes from './UpcomingAppointments.module.css';

interface UpcomingAppointmentsProps {
  newAppointment: AppointmentType;
}

const UpcomingAppointments: FC<UpcomingAppointmentsProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);

  const [appointments, setAppointments] = useState<Array<AppointmentType>>();

  const fetchAppointments = async () => {
    const response = await fetch('/api/appointments', {
      method: 'GET',
      headers: {
        Authorization: `bearer ${user?.token}`
      }
    });

    const fetchedAppointments: Array<AppointmentType> = await response.json();

    setAppointments(fetchedAppointments);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    setAppointments((prevAppointments) =>
      prevAppointments?.concat(props.newAppointment)
    );
  }, [props.newAppointment]);

  return (
    <Card className={classes.container}>
      <h4>Upcoming appointments</h4>
      {appointments ? (
        appointments
          .sort(
            (a, b) =>
              new Date(a.scheduled).getTime() - new Date(b.scheduled).getTime()
          )
          .map((appointment) => (
            <UpcomingAppointmentItem
              key={appointment.id}
              appointment={appointment}
            />
          ))
      ) : (
        <CircularProgress color="primary" />
      )}
    </Card>
  );
};

export default UpcomingAppointments;
