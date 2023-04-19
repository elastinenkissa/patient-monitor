import { FormControl, OutlinedInput } from '@mui/material';
import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import classes from './LoginInput.module.css';
import { ArrowRight } from '@mui/icons-material';

interface LoginInputProps {
  show: boolean;
  onExited: () => void;
}

const LoginInput: FC<LoginInputProps> = (props) => {
  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="login-input"
      unmountOnExit
      mountOnEnter
      onExited={props.onExited}
    >
      <form>
        <FormControl>
          <OutlinedInput className={classes.input} />
          <ArrowRight className={classes.arrow} />
        </FormControl>
      </form>
    </CSSTransition>
  );
};

export default LoginInput;
