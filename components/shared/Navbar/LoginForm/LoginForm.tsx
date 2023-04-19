import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import LoginButton, { LoginType } from './LoginButton/LoginButton';
import LoginInput from './LoginInput/LoginInput';

import classes from './LoginForm.module.css';

const LoginForm: FC = () => {
  const [loginType, setLoginType] = useState<LoginType>();

  const [showLoginButton, setShowLoginButton] = useState<boolean>(true);
  const [showRegisterButton, setShowRegisterButton] = useState<boolean>(true);

  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  const router = useRouter();

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
          onLogin={(value) => router.push('/home')}
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
          onLogin={(value) => router.push('/home')}
          loginType={loginType}
        />
      </div>
    </div>
  );
};

export default LoginForm;
