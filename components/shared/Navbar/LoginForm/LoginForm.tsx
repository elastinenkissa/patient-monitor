import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import LoginButton, { LoginType } from './LoginButton/LoginButton';
import LoginInput from './LoginInput/LoginInput';

import { UserContext, UserContextType } from '@/context/UserContext';

import classes from './LoginForm.module.css';

const LoginForm: FC = () => {
  const { user, login } = useContext<UserContextType>(UserContext);

  const [loginType, setLoginType] = useState<LoginType>();

  const [showLoginButton, setShowLoginButton] = useState<boolean>(true);
  const [showRegisterButton, setShowRegisterButton] = useState<boolean>(true);

  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  const router = useRouter();

  const loginHandler = async (value: { socialNumber: string }) => {
    try {
      const userResponse = await fetch('/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          socialNumber: value.socialNumber
        })
      });

      login(await userResponse.json());

      router.push('/home');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const registerHandler = async (value: {
    socialNumber: string;
    fullName?: string;
    companyName?: string;
  }) => {
    try {
      await fetch('/api/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          socialNumber: value.socialNumber,
          companyName: value.companyName,
          fullName: value.fullName
        })
      });
    } catch (error) {
      console.log(error);
    }

    loginHandler({ socialNumber: value.socialNumber });
  };

  useEffect(() => {
    if (loginType === 'LOGIN') {
      setShowRegisterForm(false);
      setShowLoginButton(false);
    }
    if (loginType === 'REGISTER') {
      setShowLoginForm(false);
      setShowRegisterButton(false);
    }
  }, [loginType]);

  return (
    <div className={classes.container}>
      <div className={classes.login}>
        <LoginButton
          loginType="LOGIN"
          onLoginTypeSwitch={(loginTypeParam) => setLoginType(loginTypeParam)}
          show={showLoginButton}
          onExited={() => setShowLoginForm(true)}
        />
        <LoginInput
          show={showLoginForm}
          onExited={() => setShowLoginButton(true)}
          onLogin={loginHandler}
          loginType={loginType}
        />
      </div>
      <div className={classes.login}>
        <LoginButton
          loginType="REGISTER"
          onLoginTypeSwitch={(loginTypeParam) => setLoginType(loginTypeParam)}
          show={showRegisterButton}
          onExited={() => setShowRegisterForm(true)}
        />
        <LoginInput
          show={showRegisterForm}
          onExited={() => setShowRegisterButton(true)}
          onLogin={registerHandler}
          loginType={loginType}
        />
      </div>
    </div>
  );
};

export default LoginForm;
