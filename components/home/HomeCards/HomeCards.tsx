import { FC, useContext } from 'react';

import NewPatientCard from '../NewPatientCard/NewPatientCard';
import ViewPatientsCard from '../ViewPatientsCard/ViewPatientsCard';
import AppointmentsCard from '../AppointmentsCard/AppointmentsCard';

import { PatientType } from '@/models/patient';

import { UserContext, UserContextType } from '@/context/UserContext';

import classes from './HomeCards.module.css';

interface HomeCardsProps {
  patients: Array<PatientType>;
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
        <AppointmentsCard />
      </div>
    </div>
  );
};

export default HomeCards;
