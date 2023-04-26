import { FC, ReactNode } from 'react';
import Layout from '../Layout';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = (props) => {
  return <Layout>{props.children}</Layout>;
};

export default AdminLayout;
