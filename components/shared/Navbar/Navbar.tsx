import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Display } from 'next/dist/compiled/@next/font';
import { Menu } from '@mui/icons-material';

import Notification from './Notification/Notification';
import NavbarContent from './Links/NavbarContent';
import Sidebar from './Sidebar/Sidebar';

import { UserContext, UserContextType } from '@/context/UserContext';

import classes from './Navbar.module.css';

const Navbar: FC = () => {
  const { user } = useContext<UserContextType>(UserContext);

  const [closeNavbar, setCloseNavbar] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    setCloseNavbar(true);
  }, [router.pathname]);


  return (
    <>
      {user && (
        <>
          <button
            className={classes.hamburger}
            onClick={() => setCloseNavbar(false)}
          >
            <Menu />
          </button>
          <Sidebar
            close={closeNavbar}
            onClickModal={() => setCloseNavbar(true)}
          />
        </>
      )}
      <div
        className={classes.container}
        style={{
          display: (router.pathname === '/' && 'flex') as Display,
          width: router.pathname === '/' ? '35%' : '25vw'
        }}
      >
        <NavbarContent />
      </div>
    </>
  );
};

export default Navbar;
