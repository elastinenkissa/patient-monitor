import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { FC, useContext } from 'react';

import PatientList from '@/components/patients/PatientList/PatientList';
import PatientsLayout from '@/components/shared/Layout/PatientsLayout/PatientsLayout';

import { UserContext, UserContextType } from '@/context/UserContext';

import { PatientType } from '@/models/patient';
import { Company } from '@/models/company';
import { User } from '@/models/user';

import { connectDatabase } from '@/util/connectDatabase';

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
        <div className={classes.header}>
          <h4>Name</h4>
          <h4 className={classes.health}>Health rating</h4>
          <h4>View</h4>
        </div>
        {props.patients.length > 0 && (
          <div className={classes.scrollable}>
            <PatientList patients={props.patients} />
          </div>
        )}
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

export default Patients;
