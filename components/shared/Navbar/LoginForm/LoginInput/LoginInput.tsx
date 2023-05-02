import { FC, FormEvent, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import Check from '@mui/icons-material/Check';

import { LoginType } from '../LoginButton/LoginButton';

import classes from './LoginInput.module.css';

interface LoginInputProps {
  show: boolean;
  loginType: LoginType | undefined;
  errorMessage?: string;
  onExited: () => void;
  onLogin: (value: {
    socialNumber: string;
    username: string;
    companyName?: string;
    fullName?: string;
  }) => Promise<void>;
}

const LoginInput: FC<LoginInputProps> = (props) => {
  const [username, setUsername] = useState<string>('');
  const [socialNumber, setSocialNumber] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');

  const [registerPhase, setRegisterPhase] = useState<1 | 2 | 3 | 4>(1);

  const input = (
    <>
      {registerPhase === 1 && (
        <OutlinedInput
          sx={{ paddingRight: '3rem' }}
          className={classes.input}
          value={username}
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
      )}
      {registerPhase === 2 && (
        <OutlinedInput
          sx={{ paddingRight: '3rem' }}
          className={classes.input}
          value={socialNumber}
          placeholder="Social Number"
          onChange={(event) => setSocialNumber(event.target.value)}
          type="password"
        />
      )}
      {registerPhase === 3 && (
        <OutlinedInput
          sx={{ paddingRight: '3rem' }}
          className={classes.input}
          value={fullName}
          placeholder="Full Name"
          onChange={(event) => setFullName(event.target.value)}
        />
      )}
      {registerPhase === 4 && (
        <OutlinedInput
          sx={{ paddingRight: '3rem' }}
          className={classes.input}
          value={companyName}
          placeholder="Company Name"
          onChange={(event) => setCompanyName(event.target.value)}
        />
      )}
    </>
  );

  const loginHandler = (event: FormEvent) => {
    event.preventDefault();

    if (props.loginType === 'REGISTER') {
      if (registerPhase === 4) {
        const registerData = {
          fullName,
          username,
          socialNumber,
          companyName
        };

        return props.onLogin(registerData);
      }
      setRegisterPhase((prevPhase) => (prevPhase + 1) as 1 | 2 | 3);
    }

    if (props.loginType === 'LOGIN') {
      if (registerPhase === 2) {
        const loginData = {
          username,
          socialNumber
        };

        return props.onLogin(loginData);
      }

      setRegisterPhase((prevPhase) => (prevPhase + 1) as 1 | 2 | 3 | 4);
    }
  };

  const isFinalPhase =
    (registerPhase === 2 && props.loginType === 'LOGIN') ||
    (registerPhase === 4 && props.loginType === 'REGISTER');

  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="login-input"
      unmountOnExit
      mountOnEnter
      onExited={props.onExited}
    >
      <form onSubmit={loginHandler}>
        <FormControl>
          {registerPhase > 1 && (
            <button
              type="button"
              className={classes.arrow + ' ' + classes.arrowLeft}
              onClick={() =>
                setRegisterPhase(
                  (prevPhase) => (prevPhase - 1) as 1 | 2 | 3 | 4
                )
              }
            >
              <ArrowLeft />
            </button>
          )}
          {input}
          {(socialNumber.trim().length > 0 ||
            fullName.trim().length > 0 ||
            companyName.trim().length > 0 ||
            username.trim().length > 0) && (
            <button
              className={
                (isFinalPhase && classes.finalPhase) +
                ' ' +
                classes.arrow +
                ' ' +
                classes.arrowRight
              }
              type="submit"
            >
              {isFinalPhase ? <Check /> : <ArrowRight />}
            </button>
          )}
        </FormControl>
        <p className={classes.errorMessage}>{props.errorMessage}</p>
      </form>
    </CSSTransition>
  );
};

export default LoginInput;
