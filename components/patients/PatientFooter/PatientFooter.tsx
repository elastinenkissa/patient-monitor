import { FC } from 'react';

import classes from './PatientFooter.module.css';

interface PatientFooterProps {
  onNewEntry: () => void;
}

const PatientFooter: FC<PatientFooterProps> = (props) => {
  return (
    <>
      <button
        onClick={props.onNewEntry}
        className={classes.button + ' ' + classes.newEntry}
      >
        NEW ENTRY
      </button>
      <button className={classes.button + ' ' + classes.dismiss}>
        DISMISS
      </button>
    </>
  );
};

export default PatientFooter;
