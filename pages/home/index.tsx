import Head from 'next/head';
import { FC, useContext, useEffect, useState } from 'react';

import HomeCards from '@/components/home/HomeCards/HomeCards';
import HomeLayout from '@/components/shared/Layout/HomeLayout/HomeLayout';

import { UserContext, UserContextType } from '@/context/UserContext';

import { PatientType } from '@/models/patient';

import classes from './Home.module.css';

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: FC = () => {
  const { user } = useContext<UserContextType>(UserContext);

  // const { data } = useSWR<Array<PatientType>>('/api/patients/recent', fetcher);

  const [patients, setPatients] = useState<Array<PatientType>>();

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patients/recent', {
        headers: {
          Authorization: `bearer ${user?.token}`
        }
      });
      const fetchedPatients: Array<PatientType> = await response.json();

      setPatients(fetchedPatients);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <HomeLayout>
      <Head>
        <title>PatientsE</title>
        <meta name="description" content="Time heals all wounds." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={classes.container}>
        <h1>{user?.company.name}</h1>
        <HomeCards patients={patients!} />
      </div>
    </HomeLayout>
  );
};

export default Home;
