import { FC, useState, useContext } from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useRouter } from 'next/router';

import Form from '@/components/shared/Form/Form';
import DaySelect from './DaySelect/DaySelect';
import MonthSelect from './MonthSelect/MonthSelect';
import HourSelect from './HourSelect/HourSelect';
import MinuteSelect from './MinuteSelect/MinuteSelect';
import YearSelect from './YearSelect/YearSelect';

import { UserContext, UserContextType } from '@/context/UserContext';
import {
  NotificationContext,
  NotificationContextType
} from '@/context/NotificationContext';

import { AppointmentType } from '@/models/appointment';
import { PatientType } from '@/models/patient';

import classes from './NewAppointment.module.css';

interface NewAppointmentProps {
  onNewAppointment: (appointment: AppointmentType) => void;
  patient?: PatientType;
  className?: string;
}

const NewAppointment: FC<NewAppointmentProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);
  const { setNotification } =
    useContext<NotificationContextType>(NotificationContext);

  const [name, setName] = useState<string>('');
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>();
  const [hour, setHour] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [year, setYear] = useState<number>();

  const [submitted, setSubmitted] = useState<boolean>(false);

  const router = useRouter();

  const addAppointmentHandler = async () => {
    if (
      (!name && router.pathname === '/home') ||
      !day ||
      !year ||
      !month ||
      !hour ||
      !minutes
    ) {
      return;
    }

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        body: JSON.stringify({
          patientName: name,
          scheduled: new Date(year, month - 1, day, hour, minutes),
          patientId: props.patient?.id
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${user?.token}`
        }
      });

      if (!response.ok) {
        throw new Error(JSON.parse(await response.text()).message);
      }

      setSubmitted(true);

      const newAppointment: AppointmentType = await response.json();

      props.onNewAppointment(newAppointment);

      setNotification('Appointment scheduled!', 'success')

      setName('');
    } catch (error: any) {
      setNotification(error.message, 'error');
    }

    setSubmitted(false);
  };

  return (
    <Form
      className={classes.container + props.className}
      buttonText="ADD"
      onSubmit={addAppointmentHandler}
      valid={!!day && !!year && !!hour && !!month && !!minutes && (router.pathname === '/home' ? !!name : true)}
    >
      {router.pathname === '/home' && (
        <>
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
        </>
      )}
      <div className={classes.date}>
        <FormControl sx={{ width: 100, marginBottom: '1rem' }}>
          <MonthSelect
            onChangeMonth={(value) => setMonth(value)}
            submitted={submitted}
          />
        </FormControl>
        <FormControl sx={{ width: 100 }}>
          <DaySelect
            month={month}
            onChangeDay={(value) => setDay(value)}
            submitted={submitted}
          />
        </FormControl>
        <FormControl sx={{ width: 100 }}>
          <YearSelect
            onChangeYear={(value) => setYear(value)}
            submitted={submitted}
          />
        </FormControl>
        <FormControl sx={{ width: 100, marginBottom: '1rem' }}>
          <HourSelect
            onChangeHour={(value) => setHour(value)}
            submitted={submitted}
          />
        </FormControl>
        <FormControl sx={{ width: 100, marginBottom: '1rem' }}>
          <MinuteSelect
            onChangeMinutes={(value) => setMinutes(value)}
            submitted={submitted}
          />
        </FormControl>
      </div>
    </Form>
  );
};

export default NewAppointment;
