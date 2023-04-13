import { FC, ReactNode } from "react";

import classes from './AppLayout.module.css'

interface AppLayoutProps {
  children: ReactNode;
  className: string;
}

const AppLayout: FC<AppLayoutProps> = (props) => {
  return (
    <div className={classes.layout + ' ' + props.className}>{props.children}</div>
  );
};

export default AppLayout;
