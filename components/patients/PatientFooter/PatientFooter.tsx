import { FC, useContext } from 'react';

import Button from '@/components/shared/Button/Button';

import { PatientType } from '@/models/patient';

import { UserContext, UserContextType } from '@/context/UserContext';

import classes from './PatientFooter.module.css';

interface PatientFooterProps {
  onNewEntry: () => void;
  patient: PatientType & { assignedDoctorId: string | undefined };
}

const PatientFooter: FC<PatientFooterProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);

  const dismissPatientHandler = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        const response = await fetch(
          `/api/doctors/${user!.id}?patientId=${props.patient.id}`,
          {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(await response.text());
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <Button onClick={props.onNewEntry} className={classes.button}>
        NEW ENTRY
      </Button>
      {user?.id === props.patient.assignedDoctorId && (
        <Button
          className={classes.button + ' ' + classes.dismiss}
          onClick={dismissPatientHandler}
        >
          DISMISS
        </Button>
      )}
    </>
  );
};

export default PatientFooter;
