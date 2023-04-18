import { FC } from 'react';

import { Entry as EntryType } from '@/types/patient';

import classes from './Entry.module.css';
import MedicalRecords from '../MedicalRecords/MedicalRecords';
import HealthRating from '../HealthRating/HealthRating';

interface EntryProps {
  entry: EntryType;
}

const Entry: FC<EntryProps> = (props) => {
  return (
    <div className={classes.entry}>
      <p className={classes.content}>{props.entry.content}</p>

      {props.entry.addedPrescriptions.length > 0 && (
        <MedicalRecords records={props.entry.addedPrescriptions}>
          Added prescriptions
        </MedicalRecords>
      )}
      {props.entry.removingPrescriptions?.length > 0 && (
        <MedicalRecords records={props.entry.removingPrescriptions}>
          Removed prescrpitions
        </MedicalRecords>
      )}
      {props.entry.addedDiagnosis?.length > 0 && (
        <MedicalRecords records={props.entry.addedDiagnosis}>
          Added diagnosis
        </MedicalRecords>
      )}
      {props.entry.removingDiagnosis.length > 0 && (
        <MedicalRecords records={props.entry.removingDiagnosis}>
          Removed diagnosis
        </MedicalRecords>
      )}
      <div className={classes.healthRating}>
        <p>Health rating:</p>
        <HealthRating healthRating={props.entry.newHealthRating} />
      </div>
      <em>
        Checked by {props.entry.by.name} on {props.entry.date}
      </em>
    </div>
  );
};

export default Entry;
