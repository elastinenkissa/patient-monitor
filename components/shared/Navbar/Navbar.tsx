import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Menu from '@mui/icons-material/Menu';

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
        className={
          classes.container + ' ' + (router.pathname === '/' && classes.mobile)
        }
      >
        <NavbarContent />
      </div>
    </>
  );
};

export default Navbar;
