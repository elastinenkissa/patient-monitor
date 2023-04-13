import { FC, ReactNode } from 'react';

import classes from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = (props) => {
  return (
    <div className={classes.card + ' ' + props.className}>{props.children}</div>
  );
};

export default Card;
