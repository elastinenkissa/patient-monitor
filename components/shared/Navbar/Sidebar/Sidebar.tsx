import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import Modal from '@mui/material/Modal';

import NavbarContent from '../Links/NavbarContent';

import classes from './Sidebar.module.css';

interface SidebarProps {
  close: boolean | undefined;
  onClickModal: () => void;
}

const Sidebar: FC<SidebarProps> = (props) => {
  return (
    <div>
      <CSSTransition
        in={!props.close}
        timeout={300}
        classNames="navbar"
        mountOnEnter
        unmountOnExit
      >
        <div className={classes.container}>
          <NavbarContent />
        </div>
      </CSSTransition>
      <Modal
        open={!props.close}
        onClose={props.onClickModal}
        style={{ zIndex: 50 }}
      >
        <div></div>
      </Modal>
    </div>
  );
};

export default Sidebar;
