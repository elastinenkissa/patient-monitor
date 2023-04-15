import { FC } from 'react';

import { Entry as EntryType } from '@/types/patient';

import classes from './Entry.module.css';
import MedicalRecords from '../MedicalRecords/MedicalRecords';

interface EntryProps {
  entry: EntryType;
}

const Entry: FC<EntryProps> = (props) => {
  return (
    <div className={classes.entry}>
      <p className={classes.content}>{props.entry.content}</p>
      {props.entry.addedDiagnosis && (
        <MedicalRecords records={props.entry.addedDiagnosis}>
          Added diagnosis
        </MedicalRecords>
      )}
      {props.entry.removedDiagnosis && (
        <MedicalRecords records={props.entry.removedDiagnosis}>
          Removed diagnosis
        </MedicalRecords>
      )}
      {props.entry.addedPrescriptions && (
        <MedicalRecords records={props.entry.addedPrescriptions}>
          Added prescriptions
        </MedicalRecords>
      )}
      {props.entry.removedPrescriptions && (
        <MedicalRecords records={props.entry.removedPrescriptions}>
          Removed prescrpitions
        </MedicalRecords>
      )}
      <em>
        Checked by {props.entry.by.name} on {props.entry.date}
      </em>
    </div>
  );
};

export default Entry;
