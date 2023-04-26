import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { ChangeEvent, useContext, useState } from 'react';
import Link from 'next/link';
import { Input } from '@mui/material';

import PatientList from '@/components/patients/PatientList/PatientList';
import PatientsLayout from '@/components/shared/Layout/PatientsLayout/PatientsLayout';

import { UserContext, UserContextType } from '@/context/UserContext';

import { PatientType } from '@/models/patient';
import { Company } from '@/models/company';
import { User } from '@/models/user';

import { connectDatabase } from '@/util/connectDatabase';
import withAuth from '@/util/higherOrderComponents';

import classes from './Patients.module.css';

interface PatientsProps extends Record<string, unknown> {
  patients: Array<PatientType>;
}

const Patients: NextPage<PatientsProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);

  const [patients, setPatients] = useState<Array<PatientType>>(props.patients);

  const searchPatientsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setPatients(props.patients);
    }

    setPatients(
      props.patients.filter((patient) =>
        patient.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

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
        <hr />
        <div
          className={`${classes.scrollable} ${
            (!patients || patients.length === 0) && classes.noPatients
          }`}
        >
          <div
            className={`${
              (!patients || patients.length === 0) && classes.noPatientsContent
            }`}
          >
            <PatientList patients={patients} />
            {(!patients || patients.length === 0) && (
              <Link href="/patients/new" className={classes.addNewLink}>
                Add new?
              </Link>
            )}
          </div>
        </div>
        <Input
          sx={{
            margin: '2rem',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '92%',
            height: 40
          }}
          placeholder="Search..."
          onChange={searchPatientsHandler}
        />
      </PatientsLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { company, doctor } = context.query;

  if (company) {
    try {
      await connectDatabase();

      const fetchedCompany = await Company.findById(company).populate(
        'patients'
      );

      if (!fetchedCompany) {
        return {
          notFound: true
        };
      }

      return {
        props: {
          patients: JSON.parse(JSON.stringify(fetchedCompany.patients))
        }
      };
    } catch (error: any) {
      return {
        notFound: true
      };
    }
  }

  if (doctor) {
    try {
      await connectDatabase();

      const fetchedDoctor = await User.findById(doctor).populate('patients');

      if (!fetchedDoctor) {
        console.log('i here');

        return {
          notFound: true
        };
      }

      return {
        props: {
          patients: JSON.parse(JSON.stringify(fetchedDoctor.patients))
        }
      };
    } catch (error: any) {
      return {
        notFound: true
      };
    }
  }

  return {
    notFound: true
  };
};

export default withAuth(Patients);
