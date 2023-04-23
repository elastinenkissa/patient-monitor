import { FC } from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

import Form from '@/components/shared/Form/Form';

import classes from './NewAppointment.module.css';

const NewAppointment: FC = (props) => {
  const addAppointmentHandler = () => {
    console.log('lalala');
  };

  return (
    <Form
      className={classes.container}
      buttonText="ADD"
      onSubmit={addAppointmentHandler}
    >
      <FormControl>
        <InputLabel htmlFor="name">Name</InputLabel>
        <OutlinedInput id="name" label="Name" />
      </FormControl>
    </Form>
  );
};

export default NewAppointment;
