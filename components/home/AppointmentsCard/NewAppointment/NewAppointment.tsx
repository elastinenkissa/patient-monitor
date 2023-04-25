import { FC, useState, useContext } from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

import Form from '@/components/shared/Form/Form';
import DaySelect from './DaySelect/DaySelect';
import MonthSelect from './MonthSelect/MonthSelect';
import HourSelect from './HourSelect/HourSelect';
import MinuteSelect from './MinuteSelect/MinuteSelect';
import YearSelect from './YearSelect/YearSelect';

import { UserContext, UserContextType } from '@/context/UserContext';

import { AppointmentType } from '@/models/appointment';

import classes from './NewAppointment.module.css';

interface NewAppointmentProps {
  onNewAppointment: (appointment: AppointmentType) => void;
}

const NewAppointment: FC<NewAppointmentProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);

  const [name, setName] = useState<string>('');
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>();
  const [hour, setHour] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [year, setYear] = useState<number>();

  const addAppointmentHandler = async () => {
    if (!name || !day || !year || !month || !hour || !minutes) {
      return;
    }

    try {
      const response = await fetch('/api/appointments', {
        method: 'post',
        body: JSON.stringify({
          patientName: name,
          scheduled: new Date(year, month - 1, day, hour, minutes)
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${user?.token}`
        }
      });

      if (!response.ok) {
        throw new Error(JSON.parse(await response.text()).message);
      }

      const newAppointment: AppointmentType = await response.json();

      props.onNewAppointment(newAppointment);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Form
      className={classes.container}
      buttonText="ADD"
      onSubmit={addAppointmentHandler}
    >
      <h4>New appointment</h4>
      <FormControl sx={{ marginBottom: '1rem', marginTop: '2rem' }}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <OutlinedInput
          id="name"
          label="Name"
          value={name}
          onChange={(event) => setName(event?.target.value)}
        />
      </FormControl>
      <div className={classes.date}>
        <FormControl sx={{ width: 100, marginBottom: '1rem' }}>
          <MonthSelect onChangeMonth={(value) => setMonth(value)} />
        </FormControl>
        <FormControl sx={{ width: 100 }}>
          <DaySelect month={month} onChangeDay={(value) => setDay(value)} />
        </FormControl>
        <FormControl sx={{ width: 100 }}>
          <YearSelect onChangeYear={(value) => setYear(value)} />
        </FormControl>
        <FormControl sx={{ width: 100, marginBottom: '1rem' }}>
          <HourSelect onChangeHour={(value) => setHour(value)} />
        </FormControl>
        <FormControl sx={{ width: 100, marginBottom: '1rem' }}>
          <MinuteSelect onChangeMinutes={(value) => setMinutes(value)} />
        </FormControl>
      </div>
    </Form>
  );
};

export default NewAppointment;
