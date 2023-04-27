import { FC, useContext } from 'react';
import {
  AccountBalance,
  Build,
  Clear,
  Edit,
  Person
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';

import { Employee } from '@/models/user';

import { UserContext, UserContextType } from '@/context/UserContext';
import {
  NotificationContext,
  NotificationContextType
} from '@/context/NotificationContext';

import classes from './EmployeeItem.module.css';

interface EmployeeItemProps {
  employee: Employee;
  onRemoveEmployee: (employee: Employee) => void;
  onEditEmployee: (employee: Employee) => void;
}

const EmployeeItem: FC<EmployeeItemProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);
  const { setNotification } =
    useContext<NotificationContextType>(NotificationContext);

  const employeeType = (props.employee.isOwner && (
    <Tooltip title="Owner">
      <AccountBalance />
    </Tooltip>
  )) ||
    (props.employee.isAdministrator && (
      <Tooltip title="Administrator">
        <Build />
      </Tooltip>
    )) || (
      <Tooltip title="Employee">
        <Person />
      </Tooltip>
    );

  const removeEmployeeHandler = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        const response = await fetch(`/api/doctors/${props.employee.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `bearer ${user?.token}`
          }
        });

        if (!response.ok) {
          throw new Error(JSON.parse(await response.text()).message);
        }

        setNotification(
          `Successfully removed ${props.employee.name} from ${user?.company.name}.`,
          'success'
        );

        props.onRemoveEmployee(props.employee);
      } catch (error: any) {
        setNotification(error.message, 'error');
      }
    }
  };

  const editEmployeeHandler = () => {
    props.onEditEmployee(props.employee);
  };

  return (
    <div className={classes.container}>
      <p>{props.employee.name}</p>
      <div className={classes.rightItem}>
        <div className={classes.role}>{employeeType}</div>
        {(!props.employee.isOwner ||
          (props.employee.isAdministrator && user?.isAdministrator)) && (
          <>
            <button className={classes.button} onClick={editEmployeeHandler}>
              <Edit />
            </button>
            <button className={classes.button} onClick={removeEmployeeHandler}>
              <Clear />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeItem;
