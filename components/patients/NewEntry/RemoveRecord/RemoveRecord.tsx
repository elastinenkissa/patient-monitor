import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { ChangeEvent, FC } from 'react';

import classes from './RemoveRecord.module.css';

interface RemoveRecordProps {
  records: Array<string>;
  recordType: string;
  onSelect: (record: string) => void;
  onDeselect: (record: string) => void;
}

const RemoveRecord: FC<RemoveRecordProps> = (props) => {
  const selectHandler = (checked: boolean, record: string) => {
    if (checked) {
      return props.onSelect(record);
    }
    props.onDeselect(record);
  };

  return (
    <FormGroup className={classes.removeDiagnosis}>
      <p className={classes.label}>(Optional) Remove {props.recordType}:</p>
      <div>
        {props.records.map((record) => (
          <FormControlLabel
            key={record}
            control={
              <Checkbox
                onChange={(_event, checked) => selectHandler(checked, record)}
              />
            }
            label={record}
          />
        ))}
      </div>
    </FormGroup>
  );
};

export default RemoveRecord;
