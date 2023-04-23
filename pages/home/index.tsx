import Head from 'next/head';
import { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';

import HomeCards from '@/components/home/HomeCards/HomeCards';
import HomeLayout from '@/components/shared/Layout/HomeLayout/HomeLayout';

import { UserContext, UserContextType } from '@/context/UserContext';

import withAuth from '@/util/higherOrderComponents';

import { PatientType } from '@/models/patient';

import classes from './Home.module.css';

const Home: NextPage = () => {
  const { user } = useContext<UserContextType>(UserContext);

  const [patients, setPatients] = useState<Array<PatientType>>();

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patients/recent', {
        headers: {
          Authorization: `bearer ${user?.token}`
        }
      });

      if (!response.ok) {
        throw new Error(JSON.parse(await response.text()).message);
      }

      const fetchedPatients: Array<PatientType> = await response.json();
      setPatients(fetchedPatients);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Patients Monitor</title>
        <meta name="description" content="Some description" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <HomeLayout>
        <div className={classes.container}>
          <h1>{user?.company.name}</h1>
          <HomeCards patients={patients!} />
        </div>
      </HomeLayout>
    </>
  );
};

export default withAuth(Home);
