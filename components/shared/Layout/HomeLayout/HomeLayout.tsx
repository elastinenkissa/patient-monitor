import { FC, ReactNode } from 'react';

import Layout from '../Layout';

import classes from './HomeLayout.module.css';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: FC<HomeLayoutProps> = (props) => {
  return (
    <Layout>
      <div className={classes.container}>{props.children}</div>
    </Layout>
  );
};

export default HomeLayout;
