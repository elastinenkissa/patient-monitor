import Head from 'next/head';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Healthcare company name - Patients</title>
        <meta
          name="description"
          content="Patients registered to your healthcare company."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    </>
  );
};

export default Home;
