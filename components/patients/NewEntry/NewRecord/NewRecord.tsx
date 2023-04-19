import { AddCircle } from '@mui/icons-material';
import { Badge, InputLabel, OutlinedInput } from '@mui/material';
import { ChangeEvent, FC, FocusEvent, useState } from 'react';

import MedicalRecord from '../../MedicalRecord/MedicalRecord';

import classes from './NewRecord.module.css';

interface NewRecordProps {
  records: Array<string>;
  onAddRecord: (value: string) => void;
  htmlId: string;
  label: string;
}

const NewRecord: FC<NewRecordProps> = (props) => {
  const [recordValue, setRecordValue] = useState<string>('');

  const [addButtonIsShown, setAddButtonIsShown] = useState<boolean>(false);

  const addRecordHandler = () => {
    props.onAddRecord(recordValue);
    setAddButtonIsShown(false)
    setRecordValue('');
  };

  return (
    <>
      <div className={classes.recordInput}>
        <InputLabel htmlFor={props.htmlId} margin="dense">
          (Optional) {props.label}
        </InputLabel>
        <OutlinedInput
          id={props.htmlId}
          className={classes.input}
          label={props.label + '(Optional)'}
          value={recordValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setRecordValue(event.target.value)
          }
          onFocus={() => setAddButtonIsShown(true)}
          onBlur={(event: FocusEvent<HTMLTextAreaElement>) => {
            if (event.target.value === '') {
              setAddButtonIsShown(false);
            }
          }}
        />
        {addButtonIsShown && <AddCircle onClick={addRecordHandler} />}
      </div>
      <div className={classes.recordList}>
        {props.records.map((record) => (
          <MedicalRecord record={record} key={record} />
        ))}
      </div>
    </>
  );
};

export default NewRecord;
