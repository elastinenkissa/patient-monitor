import { FC, useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Home,
  Logout,
  PeopleAlt,
  AdminPanelSettings,
  Menu
} from '@mui/icons-material';
import { useRouter } from 'next/router';

import LoginForm from './LoginForm/LoginForm';
import Notification from './Notification/Notification';

import { UserContext, UserContextType } from '@/context/UserContext';

import logo from '../../../public/logo.png'

import classes from './Navbar.module.css';

const Navbar: FC = () => {
  const { user, logout } = useContext<UserContextType>(UserContext);

  const router = useRouter();

  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      <button className={classes.hamburger}>
        <Menu />
      </button>
      <div className={classes.container}>
        <Image
          src={logo}
          alt="Patient Monitor"
          width={200}
          height={150}
        />
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
                href={`/patients`}
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
        <Notification />
      </div>
    </>
  );
};

export default Navbar;
