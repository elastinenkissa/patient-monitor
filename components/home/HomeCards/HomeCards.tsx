import { FC, useContext } from 'react';

import NewPatientCard from '../NewPatientCard/NewPatientCard';
import ViewPatientsCard from '../ViewPatientsCard/ViewPatientsCard';
import AppointmentsCard from '../AppointmentsCard/AppointmentsCard';

import { PatientType } from '@/models/patient';

import { UserContext, UserContextType } from '@/context/UserContext';

import { AppointmentType } from '@/models/appointment';

import classes from './HomeCards.module.css';

interface HomeCardsProps {
  patients: Array<PatientType>;
  appointments: Array<AppointmentType>;
}

const HomeCards: FC<HomeCardsProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);

  return (
    <div className={classes.container}>
      <div>
        <ViewPatientsCard user={user} patients={props.patients} />
        <NewPatientCard />
      </div>
      <div>
        <AppointmentsCard appointments={props.appointments} />
      </div>
    </div>
  );
};

export default HomeCards;
