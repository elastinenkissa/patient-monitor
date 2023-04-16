import { FC } from 'react';

import Button from '@/components/shared/Button/Button';

import classes from './PatientFooter.module.css';

interface PatientFooterProps {
  onNewEntry: () => void;
}

const PatientFooter: FC<PatientFooterProps> = (props) => {
  return (
    <>
      <Button
        onClick={props.onNewEntry}
        className={classes.button}
      >
        NEW ENTRY
      </Button>
      <Button className={classes.button + ' ' + classes.dismiss}>
        DISMISS
      </Button>
    </>
  );
};

export default PatientFooter;
