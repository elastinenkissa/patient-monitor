import { useRouter } from 'next/router';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { FC, useState } from 'react';
import { Female, Male, Transgender } from '@mui/icons-material';
import { Modal } from '@mui/material';
import Head from 'next/head';

import PatientsLayout from '@/components/shared/Layout/PatientsLayout/PatientsLayout';
import PatientHeader from '@/components/patients/PatientHeader/PatientHeader';
import Entries from '@/components/patients/Entries/Entries';
import PatientFooter from '@/components/patients/PatientFooter/PatientFooter';
import Diagnosis from '@/components/patients/Diagnosis/Diagnosis';
import Prescriptions from '@/components/patients/Prescriptions/Prescriptions';
import NewEntry from '@/components/patients/NewEntry/NewEntry';

import { Patient as PatientType } from '@/types/patient';

import classes from './Patient.module.css';

interface PatientProps {
  patient: PatientType;
}

const Patient: FC<PatientProps> = (props) => {
  const [patient, setPatient] = useState<PatientType>(props.patient);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

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
        <meta name="description" content={`Patient ${patient.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PatientsLayout>
        <div className={classes.container}>
          <div className={classes.main}>
            <PatientHeader patient={patient} genderSymbol={gender} />
            <Entries patient={patient} />
            <Diagnosis patient={patient} />
            <Prescriptions patient={patient} />
          </div>
          <div className={classes.buttons}>
            <PatientFooter onNewEntry={() => setModalIsVisible(true)} />
            <Modal
              className={classes.modal}
              open={modalIsVisible}
              onClose={() => setModalIsVisible(false)}
            >
              <NewEntry visible={modalIsVisible} />
            </Modal>
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
      identificationNumber: 'blabla055',
      diagnosis: [
        'Malding',
        'Malding',
        'Malding',
        'Malding',
        'Malding',
        'Malding',
        'Malding',
        'Malding',
        'Malding',
        'Malding',
        'Malding',
        'Malding',
        'Malding',
        'Malding',
        'Malding',
        'Malding'
      ],
      prescriptions: ['bludfluw'],
      entries: [
        {
          content:
            'This guy got 1 heart, he should eat some food to regenThis guy got 1 heart, he should eat some food to regenThis guy got 1 heart, he should eat some food to regenThis guy got 1 heart, he should eat some food to regenThis guy got 1 heart, he should eat some food to regen',
          date: new Date().toLocaleString(),
          by: {
            id: 'u1',
            name: 'Arto Hellas'
          },
          addedDiagnosis: ['Malding'],
          addedPrescriptions: ['bludfluw']
        },
        {
          content: 'This guy got 1 heart, he should eat some food to regen',
          date: new Date().toLocaleString(),
          by: {
            id: 'u1',
            name: 'Arto Hellas'
          }
        },
        {
          content: 'This guy got 1 heart, he should eat some food to regen',
          date: new Date().toLocaleString(),
          by: {
            id: 'u1',
            name: 'Arto Hellas'
          }
        },
        {
          content: 'This guy got 1 heart, he should eat some food to regen',
          date: new Date().toLocaleString(),
          by: { id: 'u1', name: 'Arto Hellas' }
        },
        {
          content: 'This guy got 1 heart, he should eat some food to regen',
          date: new Date().toLocaleString(),
          by: { id: 'u1', name: 'Arto Hellas' }
        },
        {
          content: 'This guy got 1 heart, he should eat some food to regen',
          date: new Date().toLocaleString(),
          by: {
            id: 'u1',
            name: 'Arto Hellas'
          }
        }
      ]
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
