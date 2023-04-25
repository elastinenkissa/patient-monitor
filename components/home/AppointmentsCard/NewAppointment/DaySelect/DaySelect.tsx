import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, useState, useEffect } from 'react';

interface DaySelectProps {
  month: number;
  onChangeDay: (value: number) => void;
}

const DaySelect: FC<DaySelectProps> = (props) => {
  const [dayValue, setDayValue] = useState<number | string>('');

  const days: Array<number> = [];

  let numberOfDays: number = 31;

  if (props.month === 2) {
    numberOfDays = 28;

    const currentYear = new Date().getFullYear();

    if ((currentYear / 2) % 4 === 0) {
      numberOfDays = 29;
    }
  }

  if (
    props.month === 4 ||
    props.month === 6 ||
    props.month === 9 ||
    props.month === 11
  ) {
    numberOfDays = 30;
  }

  for (let i = 1; i <= numberOfDays; i++) {
    days.push(i);
  }

  const selectDayHandler = (event: SelectChangeEvent<string | number>) => {
    setDayValue(event.target.value);
    if (typeof event.target.value === 'string') {
      return;
    }
    props.onChangeDay(event.target.value);
  };

  useEffect(() => {
    if (typeof dayValue === 'string' || props.month === 0) {
      return props.onChangeDay(undefined!);
    }

    for (let i = dayValue; i >= days[days.length - 1]; i--) {
      setDayValue(i);
    }
    props.onChangeDay(dayValue);
  }, [props.month, dayValue]);

  return (
    <>
      <InputLabel id="select-day-label">Day</InputLabel>
      <Select
        id="select-day-input"
        labelId="select-day-label"
        label="Day"
        value={dayValue}
        onChange={selectDayHandler}
        defaultValue={1}
      >
        <MenuItem value="">
          <em>{props.month === 0 ? 'Select a month' : 'None'}</em>
        </MenuItem>
        {props.month !== 0 &&
          days.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
      </Select>
    </>
  );
};

export default DaySelect;
