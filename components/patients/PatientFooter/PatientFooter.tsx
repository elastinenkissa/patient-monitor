import { FC, useContext } from 'react';
import { useRouter } from 'next/router';

import Button from '@/components/shared/Button/Button';

import { PatientWithDoctor } from '@/models/patient';

import { UserContext, UserContextType } from '@/context/UserContext';

import classes from './PatientFooter.module.css';

interface PatientFooterProps {
  onNewEntry: () => void;
  onNewAppointment: () => void;
  patient: PatientWithDoctor;
}

const PatientFooter: FC<PatientFooterProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);

  const router = useRouter();

  const dismissPatientHandler = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        const response = await fetch(
          `/api/doctors/${user!.id}?patientId=${props.patient.id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(JSON.parse(await response.text()).message);
        }

        router.push(`/patients?company=${user?.company.id}`);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className={classes.container}>
      <Button onClick={props.onNewAppointment}>SCHEDULE APPOINTMENT</Button>
      <div>
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
      </div>
    </div>
  );
};

export default PatientFooter;
