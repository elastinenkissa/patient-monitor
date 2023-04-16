import { FC, ReactNode } from 'react';

import classes from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      className={classes.button + ' ' + props.className}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
