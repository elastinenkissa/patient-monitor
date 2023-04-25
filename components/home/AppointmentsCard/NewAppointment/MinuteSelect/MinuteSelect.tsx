import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, useState, useEffect } from 'react';

interface MinuteSelectProps {
  onChangeMinutes: (value: number) => void;
  submitted: boolean;
}

const MinuteSelect: FC<MinuteSelectProps> = (props) => {
  const [minuteValue, setMinuteValue] = useState<number | string>('');

  const minutes = [];

  for (let i = 1; i <= 59; i++) {
    minutes.push(i);
  }

  const changeMinutesHandler = (event: SelectChangeEvent<string | number>) => {
    setMinuteValue(event.target.value);

    if (typeof event.target.value === 'string') {
      return props.onChangeMinutes(undefined!);
    }
    props.onChangeMinutes(event.target.value);
  };

  useEffect(() => {
    setMinuteValue('');
  }, [props.submitted]);

  return (
    <>
      <InputLabel id="select-minute-label">Minutes</InputLabel>
      <Select
        id="select-minute-input"
        labelId="select-minute-label"
        label="Minutes"
        value={minuteValue}
        onChange={changeMinutesHandler}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {minutes.map((minute) => (
          <MenuItem key={minute} value={minute}>
            {minute.toString().padStart(2, '0')}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default MinuteSelect;
