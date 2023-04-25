import { FC, useState } from 'react';

import UpcomingAppointments from './UpcomingAppointments/UpcomingAppointments';
import NewAppointment from './NewAppointment/NewAppointment';

import { AppointmentType } from '@/models/appointment';

interface AppointmentsCardProps {
  appointments: Array<AppointmentType>;
}

const AppointmentsCard: FC<AppointmentsCardProps> = (props) => {
  const [newAppointment, setNewAppointment] = useState<AppointmentType>();

  return (
    <>
      <UpcomingAppointments
        newAppointment={newAppointment!}
        appointments={props.appointments}
      />
      <NewAppointment
        onNewAppointment={(appointment) => setNewAppointment(appointment)}
      />
    </>
  );
};

export default AppointmentsCard;
