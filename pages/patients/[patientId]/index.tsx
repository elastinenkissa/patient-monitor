import { GetServerSideProps, NextPage } from 'next';
import { FC, useContext, useState } from 'react';
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

import {
  PatientType,
  Patient as PatientDB,
  PatientWithDoctor
} from '@/models/patient';
import { User } from '@/models/user';

import { UserContext, UserContextType } from '@/context/UserContext';

import { connectDatabase } from '@/util/connectDatabase';
import withAuth from '@/util/higherOrderComponents';

import classes from './Patient.module.css';

interface PatientProps extends Record<string, unknown> {
  patient: PatientWithDoctor;
}

const Patient: NextPage<PatientProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);

  const [patient, setPatient] = useState<PatientWithDoctor>(props.patient);

  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

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
    setPatient({ ...newPatient, assignedDoctorId: user?.id });
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
            <PatientFooter
              onNewEntry={() => setModalIsVisible(true)}
              patient={patient}
            />
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

    const fetchedPatient = await PatientDB.findById(
      context.query.patientId
    ).populate('entries');

    if (!fetchedPatient) {
      return {
        notFound: true
      };
    }

    const user = await User.findOne({ patients: { $in: fetchedPatient.id } });

    const patient: PatientWithDoctor = {
      ...JSON.parse(JSON.stringify(fetchedPatient)),
      assignedDoctorId: user?.id || null
    };

    return {
      props: {
        patient
      }
    };
  } catch (error: any) {
    return {
      notFound: true
    };
  }
};

export default withAuth<PatientProps>(Patient);
