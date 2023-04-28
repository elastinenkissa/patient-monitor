import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { UserContext, UserContextType } from '@/context/UserContext';

import AdminLayout from '@/components/shared/Layout/AdminLayout/AdminLayout';
import AddEmployee from '@/components/dashboard/AddEmployee/AddEmployee';
import Employees from '@/components/dashboard/Employees/Employees';
import ManageEmployee from '@/components/dashboard/ManageEmployee/ManageEmployee';

import { Employee, User } from '@/models/user';

import { connectDatabase } from '@/util/connectDatabase';
import withAuth from '@/util/higherOrderComponents';

import classes from './Dashboard.module.css'

interface DashboardProps extends Record<string, unknown> {
  employees: Array<Employee>;
}

const Dashboard: NextPage<DashboardProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);

  const [employees, setEmployees] = useState<Array<Employee>>(props.employees);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>(
    undefined
  );

  const router = useRouter();

  useEffect(() => {
    if (!user?.isOwner && !user?.isAdministrator) {
      router.push('/home');
    }
  }, [router]);

  const removeEmployeeHandler = (deletingEmployee: Employee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== deletingEmployee.id)
    );
    setEditingEmployee(undefined);
  };

  const addEmployeeHandler = (newEmployee: Employee) => {
    setEmployees((prevEmployees) => prevEmployees.concat(newEmployee));
  };

  const editEmployeeHandler = async (employee: Employee) => {
    await setEditingEmployee(undefined);
    setEditingEmployee(employee);
  };

  const updateEmployeeInformationHandler = (updatedEmployee: Employee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
    setEditingEmployee(undefined);
  };

  return user?.isAdministrator || user?.isOwner ? (
    <>
      <Head>
        <title>{user.company.name} - Admin Dashboard</title>
        <meta
          name="description"
          content={`Admin dashboard for company ${user.company.name}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AdminLayout>
        <div className={classes.leftCards}>
          <Employees
            employees={employees}
            onRemoveEmployee={removeEmployeeHandler}
            onEditEmployee={editEmployeeHandler}
          />
          <ManageEmployee
            employee={editingEmployee}
            onUpdateEmployee={updateEmployeeInformationHandler}
          />
        </div>
        <AddEmployee onAddEmployee={addEmployeeHandler} />
      </AdminLayout>
    </>
  ) : (
    <></>
  );
};

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    await connectDatabase();

    const user = await User.findById(context.req.cookies.userId);

    if (!user || (!user.isAdministrator && !user.isOwner)) {
      throw new Error('Unauthorized.');
    }

    const employees = await User.find({ company: user.company });

    return {
      props: {
        employees: JSON.parse(JSON.stringify(employees))
      }
    };
  } catch (error: any) {
    return {
      notFound: true
    };
  }
};

export default withAuth(Dashboard);
