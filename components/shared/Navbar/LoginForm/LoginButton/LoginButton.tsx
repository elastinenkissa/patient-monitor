import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import Button from '@/components/shared/Button/Button';

import classes from './LoginButton.module.css'

export type LoginType = 'LOGIN' | 'REGISTER';

interface LoginButtonProps {
  loginType: LoginType;
  onLoginTypeSwitch: (loginType: LoginType) => void;
  show: boolean;
  onExited: () => void;
}

const LoginButton: FC<LoginButtonProps> = (props) => {
  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="login-button"
      unmountOnExit
      mountOnEnter
      onExited={props.onExited}
    >
      <Button className={classes.button} onClick={() => props.onLoginTypeSwitch(props.loginType)}>
        {props.loginType}
      </Button>
    </CSSTransition>
  );
};

export default LoginButton;
