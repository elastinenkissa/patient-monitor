import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, useState } from 'react';

interface HourSelectProps {
  onChangeHour: (value: number) => void;
}

const HourSelect: FC<HourSelectProps> = (props) => {
  const [hourValue, setHourValue] = useState<number | string>('');

  const hours = [];

  for (let i = 0; i <= 23; i++) {
    hours.push(i);
  }

  const changeHourHandler = (event: SelectChangeEvent<string | number>) => {
    setHourValue(event.target.value);

    if (typeof event.target.value === 'string') {
      return props.onChangeHour(undefined!);
    }
    props.onChangeHour(event.target.value);
  };

  return (
    <>
      <InputLabel id="select-hour-label">Hour</InputLabel>
      <Select
        id="select-hour-input"
        labelId="select-hour-label"
        label="Hour"
        value={hourValue}
        onChange={changeHourHandler}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {hours.map((hour) => (
          <MenuItem key={hour} value={hour}>
            {hour.toString().padStart(2, '0')}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default HourSelect;
