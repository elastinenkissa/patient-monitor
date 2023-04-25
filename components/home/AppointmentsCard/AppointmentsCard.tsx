import { FC, useState } from 'react';

import UpcomingAppointments from './UpcomingAppointments/UpcomingAppointments';
import NewAppointment from './NewAppointment/NewAppointment';

import { AppointmentType } from '@/models/appointment';

const AppointmentsCard: FC = (props) => {
  const [newAppointment, setNewAppointment] = useState<AppointmentType>();

  return (
    <>
      <UpcomingAppointments newAppointment={newAppointment!}  />
      <NewAppointment
        onNewAppointment={(appointment) => setNewAppointment(appointment)}
      />
    </>
  );
};

export default AppointmentsCard;
