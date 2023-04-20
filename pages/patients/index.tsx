import Head from 'next/head';
import { GetStaticPropsResult } from 'next';
import { FC, useContext } from 'react';

import PatientList from '@/components/patients/PatientList/PatientList';
import PatientsLayout from '@/components/shared/Layout/PatientsLayout/PatientsLayout';

import { UserContext, UserContextType } from '@/context/UserContext';

import { Patient } from '@/models/patient';

import classes from './Patients.module.css';

export const getStaticProps = (): GetStaticPropsResult<PatientsProps> => {
  return {
    props: {
      patients: [
        {
          id: 'p1',
          name: 'Arto Hellas',
          healthcareCompany: { id: 'c1', name: 'KYS' },
          sex: 'Male',
          occupation: 'Placeholder',
          healthRating: 1,
          identificationNumber: 'blabla055'
        }
      ]
    }
  };
};

interface PatientsProps {
  patients: Array<Patient>;
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
        <div className={classes.header}>
          <h4>Name</h4>
          <h4 className={classes.health}>Health rating</h4>
          <h4>View</h4>
        </div>
        <PatientList patients={props.patients} />
      </PatientsLayout>
    </>
  );
};

export default Patients;
