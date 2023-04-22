import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { UserContext, UserContextType } from '@/context/UserContext';

import withAuth from '@/util/higherOrderComponents';
import Card from '@/components/shared/Card/Card';

const Dashboard: NextPage = (props) => {
  const { user } = useContext<UserContextType>(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (!user?.isOwner && !user?.isAdministrator) {
      router.push('/home');
    }
  }, [router]);

  return user?.isAdministrator || user?.isOwner ? <Card>Test</Card> : <></>;
};

export default withAuth(Dashboard);
