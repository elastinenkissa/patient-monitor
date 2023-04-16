import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { FC } from 'react';

import classes from './RemoveRecord.module.css';

interface RemoveRecordProps {
  records: Array<string>;
  recordType: string;
}

const RemoveRecord: FC<RemoveRecordProps> = (props) => {
  return (
    <FormGroup className={classes.removeDiagnosis}>
      <p className={classes.label}>(Optional) Remove {props.recordType}:</p>
      <div>
        {props.records.map((record) => (
          <FormControlLabel
            key={record}
            control={<Checkbox />}
            label={record}
          />
        ))}
      </div>
    </FormGroup>
  );
};

export default RemoveRecord;
