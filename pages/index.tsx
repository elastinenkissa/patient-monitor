import { FC } from 'react';
import Head from 'next/head';

const Welcome: FC = () => {
  return (
    <>
      <Head>
        <title>Patient Monitor</title>
        <meta
          name="description"
          content="Patient monitoring and management services available to anyone"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:image" content="https://imgur.com/qq94gA7" />
        <meta property="og:title" content="Patient Monitor" />
        <meta
          property="og:url"
          content="https://sensational-sprinkles-170f00.netlify.app/"
        />
        <meta
          property="og:description"
          content="Patient monitoring and management services available to anyone"
        />
        <meta name="twitter:card" content="https://imgur.com/qq94gA7" />
      </Head>
    </>
  );
};

export default Welcome;
