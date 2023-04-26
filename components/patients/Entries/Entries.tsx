import { FC } from 'react';

import PatientEntry from './Entry/Entry';

import { PatientType } from '@/models/patient';

import classes from './Entries.module.css';

interface EntriesProps {
  patient: PatientType;
}

const Entries: FC<EntriesProps> = (props) => {
  return (
    <div className={classes.scrollable}>
      {props.patient.entries
        ?.map((entry) => (
          <PatientEntry key={entry + Math.random().toString()} entry={entry} />
        ))
        .reverse()}
    </div>
  );
};

export default Entries;
