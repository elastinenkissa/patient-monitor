import { FC } from 'react';

import PatientEntry from '../Entry/Entry';

import { Patient } from '@/models/patient';

import classes from './Entries.module.css';

interface EntriesProps {
  patient: Patient;
}

const Entries: FC<EntriesProps> = (props) => {
  return (
    <div className={classes.scrollable}>
      {props.patient.entries
        ?.map((entry) => (
          <PatientEntry key={entry.date + Math.random()} entry={entry} />
        ))
        .reverse()}
    </div>
  );
};

export default Entries;
