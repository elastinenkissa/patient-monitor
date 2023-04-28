import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Modal } from '@mui/material';

import NavbarContent from '../Links/NavbarContent';

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
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#121235',
            zIndex: 999,
            height: '100%',
            color: 'white',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around'
          }}
        >
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
