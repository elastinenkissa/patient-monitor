import { FC, useContext, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

import NewRecord from './NewRecord/NewRecord';
import HealthRatingChange from './HealthRatingChange/HealthRatingChange';
import RemoveRecord from './RemoveRecord/RemoveRecord';
import Form from '@/components/shared/Form/Form';

import { UserContext, UserContextType } from '@/context/UserContext';

import {
  HealthRating as HealthRatingType,
  PatientType
} from '@/models/patient';

import classes from './NewEntry.module.css';

interface NewEntryProps {
  visible: boolean;
  onAddEntry: (patient: PatientType) => void;
  patient: PatientType;
}

const NewEntry: FC<NewEntryProps> = (props) => {
  const [show, setShow] = useState(false);

  const [diagnosis, setDiagnosis] = useState<Array<string>>([]);
  const [prescriptions, setPrescriptions] = useState<Array<string>>([]);
  const [removingDiagnosis, setRemovingDiagnosis] = useState<Array<string>>([]);
  const [removingPrescriptions, setRemovingPrescriptions] = useState<
    Array<string>
  >([]);

  const [contentValue, setContentValue] = useState<string>('');
  const [newHealthRating, setNewHealthRating] = useState<HealthRatingType>(
    props.patient.healthRating
  );

  const { user } = useContext<UserContextType>(UserContext);

  useEffect(() => {
    if (props.visible === true) {
      return setShow(true);
    }
    setShow(false);
  }, [props.visible]);

  const addDiagnosisHandler = (diagnosisValue: string) => {
    if (diagnosisValue.trim() === '') {
      return;
    }

    const existingDiagnosis = diagnosis.find(
      (value) => diagnosisValue === value
    );

    if (existingDiagnosis) {
      return;
    }

    setDiagnosis((prevDiagnosis) => prevDiagnosis.concat(diagnosisValue));
  };

  const addPrescriptionHandler = (prescriptionValue: string) => {
    if (prescriptionValue.trim() === '') {
      return;
    }

    const existingPrescription = prescriptions.find(
      (value) => prescriptionValue === value
    );

    if (existingPrescription) {
      return;
    }

    setPrescriptions((prevPrescriptions) =>
      prevPrescriptions.concat(prescriptionValue)
    );
  };

  const addEntryHandler = async () => {
    if (contentValue.trim().length < 10) {
      return;
    }

    try {
      const response = await fetch(
        `/api/entries?patientId=${props.patient.id}`,
        {
          method: 'post',
          body: JSON.stringify({
            content: contentValue,
            addedDiagnosis: diagnosis,
            addedPrescriptions: prescriptions,
            newHealthRating,
            removingDiagnosis,
            removingPrescriptions
          }),
          headers: {
            Authorization: `bearer ${user?.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const patient: PatientType = await response.json();

      props.onAddEntry(patient);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="modal-appear"
      mountOnEnter
      unmountOnExit
    >
      <div className={classes.container}>
        <Form
          buttonText="ADD"
          onSubmit={addEntryHandler}
          inputsContainerHeight="50%"
        >
          <FormControl sx={{ marginBottom: '1rem' }}>
            <InputLabel htmlFor="content">Content</InputLabel>
            <OutlinedInput
              id="content"
              multiline
              className={classes.input}
              label="Content"
              value={contentValue}
              onChange={(event) => setContentValue(event.target.value)}
            />
          </FormControl>
          <FormControl
            sx={{
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <NewRecord
              label="Diagnosis"
              htmlId="diagnosis"
              records={diagnosis}
              onAddRecord={addDiagnosisHandler}
            />
          </FormControl>
          <FormControl>
            <NewRecord
              label="Prescription"
              htmlId="prescription"
              records={prescriptions}
              onAddRecord={addPrescriptionHandler}
            />
          </FormControl>
          {props.patient.diagnosis?.length > 0 && (
            <FormControl>
              <RemoveRecord
                onSelect={(record) =>
                  setRemovingDiagnosis((prevDiagnosis) =>
                    prevDiagnosis.concat(record)
                  )
                }
                onDeselect={(record) =>
                  setRemovingDiagnosis((prevDiagnosis) =>
                    prevDiagnosis.filter((diagnosis) => diagnosis !== record)
                  )
                }
                records={props.patient.diagnosis}
                recordType="diagnosis"
              />
            </FormControl>
          )}
          {props.patient.prescriptions?.length > 0 && (
            <FormControl>
              <RemoveRecord
                onSelect={(record) =>
                  setRemovingPrescriptions((prevPrescriptions) =>
                    prevPrescriptions.concat(record)
                  )
                }
                onDeselect={(record) =>
                  setRemovingPrescriptions((prevPrescriptions) =>
                    prevPrescriptions.filter(
                      (prescription) => prescription !== record
                    )
                  )
                }
                records={props.patient.prescriptions}
                recordType="prescriptions"
              />
            </FormControl>
          )}
          <FormControl sx={{ marginTop: '1rem' }}>
            <HealthRatingChange
              newHealthRating={newHealthRating}
              increaseHealthRating={() =>
                setNewHealthRating(
                  (prevRating) => (prevRating + 1) as HealthRatingType
                )
              }
              reduceHealthRating={() =>
                setNewHealthRating(
                  (prevRating) => (prevRating - 1) as HealthRatingType
                )
              }
            />
          </FormControl>
        </Form>
      </div>
    </CSSTransition>
  );
};

export default NewEntry;
