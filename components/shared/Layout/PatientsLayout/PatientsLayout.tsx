import { FC, ReactNode } from 'react';

import Card from '../../Card/Card';
import Layout from '../Layout';

import classes from './PatientsLayout.module.css';

interface PatientsLayoutProps {
  children: ReactNode;
}

const PatientsLayout: FC<PatientsLayoutProps> = (props) => {
  return (
    <Layout>
      <Card className={classes.container}>{props.children}</Card>
    </Layout>
  );
};

export default PatientsLayout;
