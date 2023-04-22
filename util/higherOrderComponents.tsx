import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { UserContext, UserContextType } from '@/context/UserContext';

const withAuth = <T extends Record<string, unknown>>(
  Page: NextPage<T>
): NextPage<T> => {
  const ProtectedRoute: NextPage<T> = (props) => {
    const { user } = useContext<UserContextType>(UserContext);

    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/');
      }
    }, [router, user]);

    return user ? <Page {...props} /> : <></>;
  };

  return ProtectedRoute;
};

export default withAuth;
