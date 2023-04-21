import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { FC, useContext } from 'react';

import PatientList from '@/components/patients/PatientList/PatientList';
import PatientsLayout from '@/components/shared/Layout/PatientsLayout/PatientsLayout';

import { UserContext, UserContextType } from '@/context/UserContext';

import { PatientType } from '@/models/patient';

import classes from './Patients.module.css';

interface PatientsProps {
  patients: Array<PatientType>;
}

const Patients: FC<PatientsProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);

  return (
    <>
      <Head>
        <title>{user?.company.name} - Patients</title>
        <meta
          name="description"
          content="Patients registered to your healthcare company."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PatientsLayout>
        {props.patients.length > 0 && (
          <>
            <div className={classes.header}>
              <h4>Name</h4>
              <h4 className={classes.health}>Health rating</h4>
              <h4>View</h4>
            </div>
            <PatientList patients={props.patients} />
          </>
        )}
      </PatientsLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const response = await fetch(
    `http://localhost:3000/api/patients?companyId=${context.query.company}&doctorId=${context.query.doctor}`
  );
  const patients = await response.json();

  return {
    props: {
      patients
    }
  };
};

export default Patients;
