import { FC, useContext } from 'react';
import { useRouter } from 'next/router';

import Button from '@/components/shared/Button/Button';

import { PatientWithDoctor } from '@/models/patient';

import { UserContext, UserContextType } from '@/context/UserContext';
import {
  NotificationContext,
  NotificationContextType
} from '@/context/NotificationContext';

import classes from './PatientFooter.module.css';

interface PatientFooterProps {
  onNewEntry: () => void;
  onNewAppointment: () => void;
  patient: PatientWithDoctor;
}

const PatientFooter: FC<PatientFooterProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);
  const { setNotification } =
    useContext<NotificationContextType>(NotificationContext);

  const router = useRouter();

  const dismissPatientHandler = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        const response = await fetch(
          `/api/doctors/${user!.id}?patientId=${props.patient.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(JSON.parse(await response.text()).message);
        }

        setNotification(`Patient ${props.patient.name} removed from your patients.`,'success')

        router.push(`/patients?company=${user?.company.id}`);
      } catch (error: any) {
        setNotification(error.message, 'error')
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
