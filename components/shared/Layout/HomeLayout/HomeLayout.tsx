import { FC, ReactNode } from 'react';

import classes from './HomeLayout.module.css';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: FC<HomeLayoutProps> = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};

export default HomeLayout;
