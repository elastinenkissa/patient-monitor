import { FC, useContext, useEffect, useState } from 'react';
import Image from 'next/image';

import Form from '@/components/shared/Form/Form';

import { UserType } from '@/models/user';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';

import { UserContext, UserContextType } from '@/context/UserContext';
import {
  NotificationContext,
  NotificationContextType
} from '@/context/NotificationContext';

interface ManageEmployeeProps {
  employee: UserType | undefined;
  onUpdateEmployee: (employee: UserType) => void;
}

const ManageEmployee: FC<ManageEmployeeProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);
  const { setNotification } =
    useContext<NotificationContextType>(NotificationContext);

  const [name, setName] = useState<string>('');
  const [type, setType] = useState<'employee' | 'admin' | ''>('');

  useEffect(() => {
    setName(props.employee?.name || '');
    setType(props.employee?.isAdministrator ? 'admin' : 'employee');
  }, [props.employee]);

  const saveEmployeeChangesHandler = async () => {
    try {
      const response = await fetch(`/api/doctors/${props.employee!.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name,
          isAdministrator: type === 'admin' ? true : false
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${user?.token}`
        }
      });

      if (!response.ok) {
        throw new Error(JSON.parse(await response.text()).message);
      }

      const updatedEmployee: UserType = await response.json();

      setNotification(
        `Successfully updated ${updatedEmployee.name}`,
        'success'
      );
      props.onUpdateEmployee(updatedEmployee);
    } catch (error: any) {
      setNotification(error.message, 'error');
    }
  };

  return (
    <Form
      buttonText="SAVE"
      valid={!!props.employee}
      onSubmit={saveEmployeeChangesHandler}
    >
      <h4 style={{ alignSelf: 'center' }}>Edit employee information</h4>
      <Image
        src={
          props.employee?.imageUrl ||
          'https://th.bing.com/th/id/R.2212e2e523684c91bb6ade690d9e3fc0?rik=jKD89fg3ekClvw&pid=ImgRaw&r=0'
        }
        alt={props.employee?.name || 'Employee name'}
        width={120}
        height={120}
        style={{
          borderRadius: 5,
          alignSelf: 'center',
          borderStyle: 'solid',
          borderWidth: 2,
          borderColor: 'grey',
          marginTop: '2rem'
        }}
      />
      <FormControl sx={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <OutlinedInput
          placeholder="Name"
          id="name"
          label="Name"
          value={name}
          disabled={!props.employee}
          onChange={(event) => setName(event.target.value)}
        />
      </FormControl>
      {user?.isOwner && (
        <FormControl sx={{ marginBottom: '1rem' }}>
          <InputLabel htmlFor="type">Type</InputLabel>
          <Select
            id="type"
            label="Type"
            defaultValue={
              props.employee?.isAdministrator ? 'admin' : 'employee'
            }
            disabled={!props.employee}
            onChange={(event) =>
              setType(event.target.value as 'admin' | 'employee')
            }
            value={type}
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="admin">Administrator</MenuItem>
          </Select>
        </FormControl>
      )}
    </Form>
  );
};

export default ManageEmployee;
