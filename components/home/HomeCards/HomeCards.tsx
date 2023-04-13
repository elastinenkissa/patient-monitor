import { FC, useContext } from 'react';

import NewPatientCard from '../NewPatientCard/NewPatientCard';
import ViewPatientsCard from '../ViewPatientsCard/ViewPatientsCard';

import { UserContext, UserContextType } from '@/context/UserContext';

const HomeCards: FC = () => {
  const { user } = useContext<UserContextType>(UserContext);

  return (
    <>
      <ViewPatientsCard user={user} />
      <NewPatientCard />
    </>
  );
};

export default HomeCards;
