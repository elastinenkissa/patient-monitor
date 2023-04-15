import { FC } from 'react';

import Card from '@/components/shared/Card/Card';

import classes from './MedicalRecord.module.css';

interface MedicalRecordProps {
  record: string;
}

const MedicalRecord: FC<MedicalRecordProps> = (props) => {
  return <Card className={classes.item}>{props.record}</Card>;
};

export default MedicalRecord;
