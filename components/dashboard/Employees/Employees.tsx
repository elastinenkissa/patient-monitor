import { FC } from 'react';

import Card from '@/components/shared/Card/Card';
import EmployeeItem from './EmployeeItem/EmployeeItem';

import { Employee } from '@/models/user';

import classes from './Employees.module.css';

interface EmployeesProps {
  employees: Array<Employee>;
  onRemoveEmployee: (employee: Employee) => void;
  onEditEmployee: (employee: Employee) => void;
}

const Employees: FC<EmployeesProps> = (props) => {
  return (
    <Card className={classes.container}>
      <h4>Employees</h4>
      <div>
        {props.employees.map((employee) => (
          <EmployeeItem
            onEditEmployee={(employee) => props.onEditEmployee(employee)}
            key={employee.id}
            employee={employee}
            onRemoveEmployee={() => props.onRemoveEmployee(employee)}
          />
        ))}
      </div>
    </Card>
  );
};

export default Employees;
