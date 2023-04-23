import { FC } from 'react';
import Head from 'next/head';

const Welcome: FC = () => {
  return (
    <>
      <Head>
        <title>Patient Monitor</title>
        <meta name="description" content="Some description" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    </>
  );
};

export default Welcome;
