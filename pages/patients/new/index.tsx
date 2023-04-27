import { useContext, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

import HealthRatingChange from '@/components/patients/NewEntry/HealthRatingChange/HealthRatingChange';
import Form from '@/components/shared/Form/Form';
import NewPatientGender from '@/components/patients/NewPatientGender/NewPatientGender';
import Layout from '@/components/shared/Layout/Layout';

import { UserContext, UserContextType } from '@/context/UserContext';
import {
  NotificationContext,
  NotificationContextType
} from '@/context/NotificationContext';

import withAuth from '@/util/higherOrderComponents';

import { Gender, HealthRating, PatientType } from '@/models/patient';

import classes from './NewPatient.module.css';

const NewPatient: NextPage = () => {
  const { user } = useContext<UserContextType>(UserContext);
  const { setNotification } =
    useContext<NotificationContextType>(NotificationContext);

  const router = useRouter();

  const [healthRating, setHealthRating] = useState<HealthRating>(1);
  const [patientGender, setPatientGender] = useState<Gender>();
  const [patientName, setPatientName] = useState<string>(
    (router.query.patientName as string) || ''
  );
  const [patientSocialNumber, setPatientSocialNumber] = useState<string>('');
  const [patientOccupation, setPatientOccupation] = useState<string>('');

  const addPatientHandler = async () => {
    if (
      !patientName ||
      !patientGender ||
      !patientSocialNumber ||
      !patientOccupation
    ) {
      return;
    }

    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        body: JSON.stringify({
          name: patientName,
          socialNumber: patientSocialNumber,
          occupation: patientOccupation,
          gender: patientGender,
          healthRating: healthRating
        }),
        headers: {
          Authorization: `bearer ${user?.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(JSON.parse(await response.text()).message);
      }

      const newPatient: PatientType = await response.json();

      if (!!router.query.appointmentId) {
        const appointmentResponse = await fetch(
          `/api/appointments/${router.query.appointment}?patientId=${newPatient.id}`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `bearer ${user?.token}`
            }
          }
        );

        if (!appointmentResponse.ok) {
          throw new Error(JSON.parse(await appointmentResponse.text()).message);
        }
      }

      setNotification(
        `Patient ${newPatient.name} added to the database!`,
        'success'
      );

      router.push(`/patients`);
    } catch (error: any) {
      return setNotification(error.message, 'error');
    }
  };

  return (
    <>
      <Head>
        <title>{user?.company.name} - New Patient</title>
        <meta
          name="description"
          content="Register a new patient in your healthcare company."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <div className={classes.container}>
          <Form
            className={classes.form}
            buttonText="ADD"
            onSubmit={addPatientHandler}
            inputsContainerHeight="65%"
            valid={
              !!patientName &&
              !!patientSocialNumber &&
              !!patientOccupation &&
              !!patientGender
            }
          >
            <FormControl sx={{ marginBottom: '1rem' }}>
              <InputLabel htmlFor="name">Full Name</InputLabel>
              <OutlinedInput
                id="name"
                label="Full Name"
                value={patientName}
                onChange={(event) => setPatientName(event.target.value)}
                disabled={!!router.query.patientName}
              />
            </FormControl>
            <FormControl sx={{ marginBottom: '1rem' }}>
              <InputLabel htmlFor="sn">Social Number</InputLabel>
              <OutlinedInput
                id="sn"
                label="Social Number"
                value={patientSocialNumber}
                onChange={(event) => setPatientSocialNumber(event.target.value)}
              />
            </FormControl>
            <FormControl sx={{ marginBottom: '1rem' }}>
              <InputLabel htmlFor="occupation">Occupation</InputLabel>
              <OutlinedInput
                id="occupation"
                label="Occupation"
                value={patientOccupation}
                onChange={(event) => setPatientOccupation(event.target.value)}
              />
            </FormControl>
            <FormControl sx={{ marginBottom: '1rem' }}>
              <NewPatientGender
                onGenderSelect={(gender) => setPatientGender(gender)}
              />
            </FormControl>
            <FormControl sx={{ marginBottom: '1rem' }}>
              <HealthRatingChange
                newHealthRating={healthRating}
                increaseHealthRating={() =>
                  setHealthRating(
                    (prevRating) => (prevRating + 1) as HealthRating
                  )
                }
                reduceHealthRating={() =>
                  setHealthRating(
                    (prevRating) => (prevRating - 1) as HealthRating
                  )
                }
              />
            </FormControl>
          </Form>
        </div>
      </Layout>
    </>
  );
};

export default withAuth(NewPatient);
