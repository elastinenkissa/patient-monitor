import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

import classes from './Layout.module.css'

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: 'tween'
      }}
      className={classes.container}
    >
      {props.children}
    </motion.div>
  );
};

export default Layout;
