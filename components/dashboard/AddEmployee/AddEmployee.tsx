import { FC, useContext, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

import Form from '@/components/shared/Form/Form';

import { Employee } from '@/models/user';

import { UserContext, UserContextType } from '@/context/UserContext';
import {
  NotificationContext,
  NotificationContextType
} from '@/context/NotificationContext';

import classes from './AddEmployee.module.css';

interface AddEmployeeProps {
  onAddEmployee: (employee: Employee) => void;
}

const AddEmployee: FC<AddEmployeeProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);
  const { setNotification } =
    useContext<NotificationContextType>(NotificationContext);

  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [socialNumber, setSocialNumber] = useState<string>('');
  const [isAdministrator, setIsAdministartor] = useState<boolean>(false);

  const addEmployeeHandler = async () => {
    try {
      const response = await fetch('/api/doctors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${user?.token}`
        },
        body: JSON.stringify({
          type: 'create',
          socialNumber: socialNumber,
          fullName: name,
          username: username,
          isAdministrator
        })
      });

      if (!response.ok) {
        throw new Error(JSON.parse(await response.text()).message);
      }

      const newEmployee: Employee = await response.json();

      props.onAddEmployee(newEmployee);

      setNotification(
        `Added employee ${newEmployee.name} to ${user?.company.name}`,
        'success'
      );

      setName('');
      setUsername('');
      setSocialNumber('');
      setIsAdministartor(false);
    } catch (error: any) {
      setNotification(error.message, 'error');
    }
  };

  return (
    <Form
      buttonText="ADD"
      onSubmit={addEmployeeHandler}
      valid={!!name && !!username && !!socialNumber}
      className={classes.container}
    >
      <h4>Add new employee</h4>
      <FormControl sx={{ marginBottom: '1rem', marginTop: '2rem' }}>
        <InputLabel htmlFor="name">Full Name</InputLabel>
        <OutlinedInput
          id="name"
          label="Full Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </FormControl>
      <FormControl sx={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <OutlinedInput
          id="username"
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </FormControl>
      <FormControl sx={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="SN">Social Number</InputLabel>
        <OutlinedInput
          id="SN"
          label="Social Number"
          value={socialNumber}
          onChange={(event) => setSocialNumber(event.target.value)}
          type="password"
        />
      </FormControl>
      {user?.isOwner && (
        <FormControl sx={{ marginBottom: '1rem' }}>
          <InputLabel htmlFor="type">Type</InputLabel>
          <Select
            id="type"
            label="Type"
            onChange={(event) =>
              event.target.value === 'admin' && setIsAdministartor(true)
            }
            defaultValue={isAdministrator ? 'admin' : 'employee'}
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="admin">Administrator</MenuItem>
          </Select>
        </FormControl>
      )}
    </Form>
  );
};

export default AddEmployee;
