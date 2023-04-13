import { FC, useContext } from 'react';
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

import Button from '../Button/Button';

import { UserContext, UserContextType } from '@/context/UserContext';

import classes from './Navbar.module.css';

const Navbar: FC = () => {
  const { user, logout } = useContext<UserContextType>(UserContext);

  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      <button className={classes.hamburger}>
        <Menu />
      </button>
      <div className={classes.container}>
        {!user ? (
          <div className={classes.buttons}>
            <Button>LOGIN</Button>
            <Button>REGISTER</Button>
          </div>
        ) : (
          <>
            <div className={classes.userInfo}>
              <Image
                src={user!.imageUrl}
                alt={user!.name}
                width={110}
                height={110}
                style={{ borderRadius: 100 }}
              />
              <h3>{user?.name}</h3>
            </div>
            <div className={classes.links}>
              <Link href="/home">
                <Home />
                <p>Home</p>
              </Link>
              <Link href="/profile">
                <AccountCircle />
                <p>Profile</p>
              </Link>
              <Link href="/patients">
                <PeopleAlt />
                <p>Patients</p>
              </Link>
              {user.isAdministrator && (
                <Link href="/dashboard">
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
