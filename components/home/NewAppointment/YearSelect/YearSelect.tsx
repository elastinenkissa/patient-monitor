import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface YearSelectProps {
  onChangeYear: (value: number) => void;
  submitted: boolean;
}

const YearSelect: FC<YearSelectProps> = (props) => {
  const currentYear = new Date().getFullYear();

  const [yearValue, setYearValue] = useState<number | string>(currentYear);

  const selectYearHandler = (event: SelectChangeEvent<string | number>) => {
    setYearValue(event.target.value);
    if (typeof event.target.value === 'string') {
      return;
    }
    props.onChangeYear(event.target.value);
  };

  useEffect(() => {
    props.onChangeYear(currentYear);
  }, []);

  useEffect(() => {
    setYearValue(currentYear);
  }, [props.submitted]);

  return (
    <>
      <InputLabel id="select-year-label">Year</InputLabel>
      <Select
        id="select-year-input"
        labelId="select-year-label"
        label="Year"
        value={yearValue}
        onChange={selectYearHandler}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={currentYear}>{currentYear}</MenuItem>
        <MenuItem value={currentYear + 1}>{currentYear + 1}</MenuItem>
      </Select>
    </>
  );
};

export default YearSelect;
