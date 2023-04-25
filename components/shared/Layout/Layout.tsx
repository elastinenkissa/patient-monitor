import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

import classes from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <motion.div
      initial={{ y: -500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 500, opacity: 0 }}
      transition={{
        type: 'tween'
      }}
      className={classes.container}
      layout="position"
    >
      {props.children}
    </motion.div>
  );
};

export default Layout;
