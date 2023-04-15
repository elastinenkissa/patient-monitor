import { FC } from 'react';

import MedicalRecord from '../MedicalRecord/MedicalRecord';

import classes from './MedicalRecords.module.css'

interface MedicalRecordsProps {
  records: Array<string> | undefined;
  children: string;
}

const MedicalRecords: FC<MedicalRecordsProps> = (props) => {
  return (
    <div className={classes.container}>
      <h4>{props.children}:</h4>
      <div className={classes.records}>
        {props.records?.map((record) => (
          <MedicalRecord key={record} record={record} />
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;
