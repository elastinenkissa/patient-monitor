import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { FC } from 'react';

import { Gender } from '@/models/patient';

import classes from './NewPatientGender.module.css';

interface NewPatientGenderProps {
  onGenderSelect: (gender: Gender) => void;
}

const NewPatientGender: FC<NewPatientGenderProps> = (props) => {
  return (
    <>
      <FormLabel id="radio-label">Gender</FormLabel>
      <RadioGroup
        name="radio-buttons-group"
        aria-labelledby="radio-label"
        className={classes.container}
        onChange={(event) => props.onGenderSelect(event.target.value as Gender)}
      >
        <FormControlLabel control={<Radio />} label="Male" value="Male" />
        <FormControlLabel control={<Radio />} label="Female" value="Female" />
        <FormControlLabel control={<Radio />} label="Other" value="Other" />
      </RadioGroup>
    </>
  );
};

export default NewPatientGender;
