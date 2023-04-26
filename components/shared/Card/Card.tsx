import { FC, ReactNode } from 'react';

import classes from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: object;
}

const Card: FC<CardProps> = (props) => {
  return (
    <div className={classes.card + ' ' + props.className} style={props.style}>{props.children}</div>
  );
};

export default Card;
