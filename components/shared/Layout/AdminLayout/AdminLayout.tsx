import { FC, ReactNode } from 'react';

import Layout from '../Layout';

import classes from './AdminLayout.module.css';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = (props) => {
  return (
    <Layout>
      <div className={classes.container}>{props.children}</div>
    </Layout>
  );
};

export default AdminLayout;
