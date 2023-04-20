import { FC, useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Home,
  AccountCircle,
  Logout,
  PeopleAlt,
  AdminPanelSettings,
  Menu
} from '@mui/icons-material';
import { useRouter } from 'next/router';

import LoginForm from './LoginForm/LoginForm';

import { UserContext, UserContextType } from '@/context/UserContext';

import classes from './Navbar.module.css';

const Navbar: FC = () => {
  const { user, logout } = useContext<UserContextType>(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      <button className={classes.hamburger}>
        <Menu />
      </button>
      <div className={classes.container}>
        <h1>PatientsE</h1> {/*make logo and replace this with it */}
        {!user ? (
          <LoginForm />
        ) : (
          <>
            <div className={classes.userInfo}>
              <Image
                src={user!.imageUrl!}
                alt={user!.name}
                width={110}
                height={110}
                style={{ borderRadius: 100 }}
              />
              <h3>{user?.name}</h3>
            </div>
            <div className={classes.links}>
              <Link
                href="/home"
                className={router.pathname === '/home' ? classes.active : ''}
              >
                <Home />
                <p>Home</p>
              </Link>
              <Link
                href="/profile"
                className={router.pathname === '/profile' ? classes.active : ''}
              >
                <AccountCircle />
                <p>Profile</p>
              </Link>
              <Link
                href="/patients"
                className={
                  router.pathname.startsWith('/patients') ? classes.active : ''
                }
              >
                <PeopleAlt />
                <p>Patients</p>
              </Link>
              {(user.isAdministrator || user.isOwner) && (
                <Link
                  href="/dashboard"
                  className={
                    router.pathname === '/dashboard' ? classes.active : ''
                  }
                >
                  <AdminPanelSettings />
                  <p>Admin Panel</p>
                </Link>
              )}
            </div>
            <Link href="/" onClick={logoutHandler} className={classes.logout}>
              <Logout />
              <p>LOGOUT</p>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
