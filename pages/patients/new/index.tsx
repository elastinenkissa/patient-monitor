import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

import HealthRatingChange from '@/components/patients/NewEntry/HealthRatingChange/HealthRatingChange';
import Button from '@/components/shared/Button/Button';
import PatientsLayout from '@/components/shared/Layout/PatientsLayout/PatientsLayout';

import { HealthRating } from '@/types/patient';

import classes from './NewPatient.module.css';

const NewPatient: FC = () => {
  const [healthRating, setHealthRating] = useState<HealthRating>(1);

  const router = useRouter();

  const addPatientHandler = (event: FormEvent) => {
    event.preventDefault();

    router.push('/patients');
  };

  return (
    <PatientsLayout className={classes.container}>
      <form className={classes.form} onSubmit={addPatientHandler}>
        <div className={classes.inputs}>
          <FormControl>
            <InputLabel htmlFor="name">Full Name</InputLabel>
            <OutlinedInput id="name" label="Full Name" />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="sn">Social Number</InputLabel>
            <OutlinedInput id="sn" label="Social Number" />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="occupation">Occupation</InputLabel>
            <OutlinedInput id="occupation" label="Occupation" />
          </FormControl>
          <FormControl className={classes.healthRatingContainer}>
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
        </div>
        <Button type="submit" className={classes.submit}>
          ADD
        </Button>
      </form>
    </PatientsLayout>
  );
};

export default NewPatient;
