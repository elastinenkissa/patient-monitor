import { FC } from 'react';
import { useRouter } from 'next/router';

import { AppointmentType } from '@/models/appointment';

import classes from './UpcomingAppointmentItem.module.css';

interface UpcomingAppointmentItemProps {
  appointment: AppointmentType;
}

const UpcomingAppointmentItem: FC<UpcomingAppointmentItemProps> = (props) => {
  const router = useRouter();

  const visitPatientHandler = () => {
    if (!props.appointment.patient) {
      return router.push(
        `/patients/new?patientName=${props.appointment.patientName}&appointment=${props.appointment.id}`
      );
    }

    router.push(`/patients/${props.appointment.patient.id}`);
  };

  return (
    <button onClick={visitPatientHandler} className={classes.container}>
      <p className={classes.name}>
        {props.appointment.patient?.name || props.appointment.patientName}
      </p>
      <p className={classes.date}>
        {new Date(props.appointment.scheduled).toLocaleString('en-GB', {
          day:'2-digit',
          month:'2-digit',
          year: '2-digit',
          hour: 'numeric',
          minute: 'numeric'
        })}
      </p>
    </button>
  );
};

export default UpcomingAppointmentItem;
