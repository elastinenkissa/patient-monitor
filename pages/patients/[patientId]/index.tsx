import { useRouter } from 'next/router';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { FC } from 'react';
import { Female, Male, Transgender } from '@mui/icons-material';

import PatientsLayout from '@/components/shared/Layout/PatientsLayout/PatientsLayout';

import { Patient as PatientType } from '@/types/patient';

import classes from './Patient.module.css';
import Head from 'next/head';

interface PatientProps {
  patient: PatientType;
}

const Patient: FC<PatientProps> = (props) => {
  const router = useRouter();

  const checkGender = () => {
    if (props.patient.sex === 'Male') {
      return (
        <Male color="primary" fontSize="large" className={classes.gender} />
      );
    }
    if (props.patient.sex === 'Female') {
      return (
        <Female color="error" fontSize="large" className={classes.gender} />
      );
    }
    if (props.patient.sex === 'Intersex') {
      return (
        <Transgender
          color="success"
          fontSize="large"
          className={classes.gender}
        />
      );
    }
  };

  const gender = checkGender();

  return (
    <>
      <Head>
        <title>Patient {props.patient.name}</title>
        <meta name="description" content={`Patient ${props.patient.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PatientsLayout>
        <div className={classes.container}>
          <div>
            <h2 className={classes.header}>
              <p>{props.patient.name}</p>
              <p>{gender}</p>
            </h2>
            <h3>ID: {props.patient.identificationNumber}</h3>
            <h3>{props.patient.occupation}</h3>
            <ul>{props.patient.entries?.map((entry) => entry.content)}</ul>
            <ul>
              {props.patient.diagnosis?.map((diagnosis) => diagnosis.code)}
            </ul>
          </div>
          <div className={classes.buttons}>
            <button className={classes.button + ' ' + classes.newEntry}>
              NEW ENTRY
            </button>
            <button className={classes.button + ' ' + classes.dismiss}>
              DISMISS
            </button>
          </div>
        </div>
      </PatientsLayout>
    </>
  );
};

export const getStaticProps = (
  context: GetStaticPropsContext<{ patientId: string }>
): GetStaticPropsResult<PatientProps> => {
  const patients: Array<PatientType> = [
    {
      id: 'p1',
      name: 'Arto Hellas',
      healthcareCompany: { id: 'c1', name: 'KYS' },
      sex: 'Male',
      occupation: 'Placeholder',
      healthRating: 1,
      identificationNumber: 'blabla055'
    }
  ];

  const patient = patients.find(
    (patient) => patient.id === context?.params?.patientId
  );

  if (!patient) {
    return {
      redirect: {
        destination: '/home',
        permanent: true
      }
    };
  }

  return {
    props: {
      patient
    }
  };
};

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: { patientId: 'p1' }
      }
    ],
    fallback: true
  };
};

export default Patient;
