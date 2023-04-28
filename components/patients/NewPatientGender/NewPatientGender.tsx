import { FC } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { Gender } from '@/models/patient';

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
        sx={{ display: 'flex', flexDirection: 'row' }}
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
