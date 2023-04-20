import Head from 'next/head';
import { FC, useContext } from 'react';
import { GetStaticPropsResult } from 'next';

import HomeCards from '@/components/home/HomeCards/HomeCards';
import HomeLayout from '@/components/shared/Layout/HomeLayout/HomeLayout';

import { UserContext, UserContextType } from '@/context/UserContext';

import { Patient } from '@/models/patient';

import classes from './Home.module.css';

export const getStaticProps = (): GetStaticPropsResult<HomeProps> => {
  return {
    props: {
      patients: [
        {
          id: 'p1',
          name: 'Arto Hellas',
          healthcareCompany: { id: 'c1', name: 'KYS' },
          sex: 'Male',
          occupation: 'Placeholder',
          healthRating: 1,
          identificationNumber: 'blabla055'
        }
      ]
    }
  };
};

interface HomeProps {
  patients: Array<Patient>;
}

const Home: FC<HomeProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);

  return (
    <HomeLayout>
      <Head>
        <title>PatientsE</title>
        <meta name="description" content="Because time heals all wounds." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={classes.container}>
        <h1>{user?.company.name}</h1>
        <HomeCards patients={props.patients} />
      </div>
    </HomeLayout>
  );
};

export default Home;
