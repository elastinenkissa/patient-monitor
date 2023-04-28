import { FC, useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface MonthSelectProps {
  onChangeMonth: (value: number) => void;
  submitted: boolean;
}

const MonthSelect: FC<MonthSelectProps> = (props) => {
  const [monthValue, setMonthValue] = useState<string | number>('');

  const selectMonthHandler = (event: SelectChangeEvent<string | number>) => {
    setMonthValue(event.target.value);

    if (typeof event.target.value === 'string') {
      return props.onChangeMonth(0);
    }
    props.onChangeMonth(event.target.value);
  };

  useEffect(() => {
    setMonthValue('');
  }, [props.submitted]);

  return (
    <>
      <InputLabel id="select-month-label">Month</InputLabel>
      <Select
        id="select-month-input"
        labelId="select-month-label"
        label="Month"
        value={monthValue}
        onChange={selectMonthHandler}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>January</MenuItem>
        <MenuItem value={2}>February</MenuItem>
        <MenuItem value={3}>March</MenuItem>
        <MenuItem value={4}>April</MenuItem>
        <MenuItem value={5}>May</MenuItem>
        <MenuItem value={6}>June</MenuItem>
        <MenuItem value={7}>July</MenuItem>
        <MenuItem value={8}>August</MenuItem>
        <MenuItem value={9}>September</MenuItem>
        <MenuItem value={10}>October</MenuItem>
        <MenuItem value={11}>November</MenuItem>
        <MenuItem value={12}>December</MenuItem>
      </Select>
    </>
  );
};

export default MonthSelect;
