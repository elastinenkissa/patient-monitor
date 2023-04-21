import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
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

import { PatientType, Patient as PatientDB } from '@/models/patient';

import { connectDatabase } from '@/util/connectDatabase';

import classes from './Patient.module.css';

interface PatientProps {
  patient: PatientType;
}

const Patient: FC<PatientProps> = (props) => {
  const [patient, setPatient] = useState<PatientType>(props.patient);

  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const router = useRouter();

  const checkGender = () => {
    if (props.patient.gender === 'Male') {
      return (
        <Male color="primary" fontSize="large" className={classes.gender} />
      );
    }
    if (props.patient.gender === 'Female') {
      return (
        <Female color="error" fontSize="large" className={classes.gender} />
      );
    }
    if (props.patient.gender === 'Other') {
      return (
        <Transgender
          color="success"
          fontSize="large"
          className={classes.gender}
        />
      );
    }
  };

  const addEntryHandler = (newPatient: PatientType) => {
    setModalIsVisible(false);
    setPatient(newPatient);
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
            {patient.diagnosis?.length > 0 && <Diagnosis patient={patient} />}
            {patient.prescriptions?.length > 0 && (
              <Prescriptions patient={patient} />
            )}
          </div>
          <div className={classes.buttons}>
            <PatientFooter onNewEntry={() => setModalIsVisible(true)} />
            <Modal
              className={classes.modal}
              open={modalIsVisible}
              onClose={() => setModalIsVisible(false)}
            >
              <NewEntry
                patient={patient}
                onAddEntry={addEntryHandler}
                visible={modalIsVisible}
              />
            </Modal>
          </div>
        </div>
      </PatientsLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PatientProps> = async (
  context
) => {
  try {
    await connectDatabase();

    const patient = await PatientDB.findById(context.query.patientId).populate(
      'entries'
    );

    if (!patient) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        patient: JSON.parse(JSON.stringify(patient))
      }
    };
  } catch (error: any) {
    return {
      notFound: true
    };
  }
};

export default Patient;
