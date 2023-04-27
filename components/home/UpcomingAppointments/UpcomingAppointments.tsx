import { FC, useState, useEffect } from 'react';

import Card from '@/components/shared/Card/Card';
import UpcomingAppointmentItem from './UpcomingAppointmentItem/UpcomingAppointmentItem';

import { AppointmentType } from '@/models/appointment';

import classes from './UpcomingAppointments.module.css';

interface UpcomingAppointmentsProps {
  newAppointment: AppointmentType;
  appointments: Array<AppointmentType>;
}

const UpcomingAppointments: FC<UpcomingAppointmentsProps> = (props) => {
  const [appointments, setAppointments] = useState<Array<AppointmentType>>(
    props.appointments
  );

  useEffect(() => {
    if (props.newAppointment) {
      setAppointments((prevAppointments) =>
        prevAppointments?.concat(props.newAppointment)
      );
    }
  }, [props.newAppointment]);

  return (
    <Card className={classes.container}>
      <h4>Upcoming appointments</h4>
      <div>
        {appointments.length > 0 ? (
          appointments
            .sort(
              (a, b) =>
                new Date(a.scheduled).getTime() -
                new Date(b.scheduled).getTime()
            )
            .map((appointment) =>
              appointment ? (
                <UpcomingAppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                />
              ) : null
            )
        ) : (
          <p>No appointments</p>
        )}
      </div>
    </Card>
  );
};

export default UpcomingAppointments;
