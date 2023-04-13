import Head from 'next/head';
import { FC } from 'react';

import HomeCards from '@/components/home/HomeCards/HomeCards';
import HomeLayout from '@/components/shared/Layout/HomeLayout/HomeLayout';

import classes from './Home.module.css';

const Home: FC = () => {
  return (
    <HomeLayout>
      <Head>
        <title>PatientsE</title>
        <meta name="description" content="Because time heals all wounds." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={classes.container}>
        <HomeCards />
      </div>
    </HomeLayout>
  );
};

export default Home;
