import { FC } from 'react';
import Head from 'next/head';

const Welcome: FC = () => {
  return (
    <>
      <Head>
        <title>Patient Monitor</title>
        <meta
          name="description"
          content="Patient monitoring and management services avaialble to anyone"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:image" content="../public/embed.png" />
      </Head>
    </>
  );
};

export default Welcome;
