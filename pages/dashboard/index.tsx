import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { UserContext, UserContextType } from '@/context/UserContext';

import withAuth from '@/util/higherOrderComponents';
import AdminLayout from '@/components/shared/Layout/AdminLayout/AdminLayout';

const Dashboard: NextPage = () => {
  const { user } = useContext<UserContextType>(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (!user?.isOwner && !user?.isAdministrator) {
      router.push('/home');
    }
  }, [router]);

  return user?.isAdministrator || user?.isOwner ? <AdminLayout>Test</AdminLayout> : <></>;
};

export default withAuth(Dashboard);
