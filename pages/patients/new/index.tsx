import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

import HealthRatingChange from '@/components/patients/NewEntry/HealthRatingChange/HealthRatingChange';
import Form from '@/components/shared/Form/Form';
import NewPatientGender from '@/components/patients/NewPatientGender/NewPatientGender';

import { Gender, HealthRating } from '@/types/patient';

import classes from './NewPatient.module.css';

const NewPatient: FC = () => {
  const [healthRating, setHealthRating] = useState<HealthRating>(1);
  const [patientGender, setPatientGender] = useState<Gender>();

  const router = useRouter();

  const addPatientHandler = () => {
    router.push('/patients');
  };

  return (
    <Form
      buttonText="ADD"
      onSubmit={addPatientHandler}
      inputsContainerHeight="65%"
    >
      <FormControl className={classes.field}>
        <InputLabel htmlFor="name">Full Name</InputLabel>
        <OutlinedInput id="name" label="Full Name" />
      </FormControl>
      <FormControl className={classes.field}>
        <InputLabel htmlFor="sn">Social Number</InputLabel>
        <OutlinedInput id="sn" label="Social Number" />
      </FormControl>
      <FormControl className={classes.field}>
        <InputLabel htmlFor="occupation">Occupation</InputLabel>
        <OutlinedInput id="occupation" label="Occupation" />
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
