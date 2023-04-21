import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

import HealthRatingChange from '@/components/patients/NewEntry/HealthRatingChange/HealthRatingChange';
import Form from '@/components/shared/Form/Form';
import NewPatientGender from '@/components/patients/NewPatientGender/NewPatientGender';

import { UserContext, UserContextType } from '@/context/UserContext';

import { Gender, HealthRating } from '@/models/patient';

import classes from './NewPatient.module.css';

const NewPatient: FC = () => {
  const { user } = useContext<UserContextType>(UserContext);

  const [healthRating, setHealthRating] = useState<HealthRating>(1);
  const [patientGender, setPatientGender] = useState<Gender>();
  const [patientName, setPatientName] = useState<string>('');
  const [patientSocialNumber, setPatientSocialNumber] = useState<string>('');
  const [patientOccupation, setPatientOccupation] = useState<string>('');

  const router = useRouter();

  const addPatientHandler = async () => {
    try {
      await fetch('/api/patients', {
        method: 'post',
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
    } catch (error: any) {
      return console.log(error.message);
    }
    router.push(`/patients?company=${user?.company.id}`);
  };

  return (
    <Form
      buttonText="ADD"
      onSubmit={addPatientHandler}
      inputsContainerHeight="65%"
    >
      <FormControl className={classes.field}>
        <InputLabel htmlFor="name">Full Name</InputLabel>
        <OutlinedInput
          id="name"
          label="Full Name"
          value={patientName}
          onChange={(event) => setPatientName(event.target.value)}
        />
      </FormControl>
      <FormControl className={classes.field}>
        <InputLabel htmlFor="sn">Social Number</InputLabel>
        <OutlinedInput
          id="sn"
          label="Social Number"
          value={patientSocialNumber}
          onChange={(event) => setPatientSocialNumber(event.target.value)}
        />
      </FormControl>
      <FormControl className={classes.field}>
        <InputLabel htmlFor="occupation">Occupation</InputLabel>
        <OutlinedInput
          id="occupation"
          label="Occupation"
          value={patientOccupation}
          onChange={(event) => setPatientOccupation(event.target.value)}
        />
      </FormControl>
      <FormControl className={classes.field}>
        <NewPatientGender
          onGenderSelect={(gender) => setPatientGender(gender)}
        />
      </FormControl>
      <FormControl className={classes.field}>
        <HealthRatingChange
          newHealthRating={healthRating}
          increaseHealthRating={() =>
            setHealthRating((prevRating) => (prevRating + 1) as HealthRating)
          }
          reduceHealthRating={() =>
            setHealthRating((prevRating) => (prevRating - 1) as HealthRating)
          }
        />
      </FormControl>
    </Form>
  );
};

export default NewPatient;
