import Head from 'next/head';
import { FC, useContext } from 'react';

import { UserContext, UserContextType } from '@/context/UserContext';

const Profile: FC = () => {
  const { user } = useContext<UserContextType>(UserContext);

  return (
    <>
      <Head>
        <title>Company name - {user?.name}</title>
        <meta name="description" content="Because time heals all wounds." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    </>
  );
};

export default Profile;
