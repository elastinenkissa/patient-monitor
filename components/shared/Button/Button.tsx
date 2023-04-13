import { FC } from 'react';

import classes from './Button.module.css';

interface ButtonProps {
  children: string;
}

const Button: FC<ButtonProps> = (props) => {
  return <button className={classes.button}>{props.children}</button>;
};

export default Button;
