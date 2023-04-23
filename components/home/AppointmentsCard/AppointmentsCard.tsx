import { FC } from 'react';

import UpcomingAppointments from './UpcomingAppointments/UpcomingAppointments';
import NewAppointment from './NewAppointment/NewAppointment';

const AppointmentsCard: FC = (props) => {
  return (
    <>
      <UpcomingAppointments />
      <NewAppointment />
    </>
  );
};

export default AppointmentsCard;
