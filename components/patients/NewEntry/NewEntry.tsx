import { FC, useContext, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

import NewRecord from './NewRecord/NewRecord';
import HealthRatingChange from './HealthRatingChange/HealthRatingChange';
import RemoveRecord from './RemoveRecord/RemoveRecord';
import Form from '@/components/shared/Form/Form';

import { UserContext, UserContextType } from '@/context/UserContext';

import {
  Entry,
  HealthRating as HealthRatingType,
  Patient
} from '@/types/patient';

import classes from './NewEntry.module.css';

interface NewEntryProps {
  visible: boolean;
  onAddEntry: (entry: Entry) => void;
  patient: Patient;
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

  const addEntryHandler = () => {
    if (contentValue.trim().length < 10) {
      return;
    }

    console.log(removingDiagnosis);
    console.log(removingPrescriptions);
    
    

    const newEntry = new Entry(
      user!,
      contentValue,
      diagnosis,
      removingDiagnosis,
      prescriptions,
      removingPrescriptions,
      newHealthRating
    );

    props.onAddEntry(newEntry);
  };

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="modal-appear"
      mountOnEnter
      unmountOnExit
    >
      <Form buttonText="ADD" onSubmit={addEntryHandler} inputsContainerHeight='50%'>
        <FormControl className={classes.formControl}>
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
        <FormControl className={classes.formControl + ' ' + classes.record}>
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
        {props.patient.diagnosis.length > 0 && (
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
        {props.patient.prescriptions.length > 0 && (
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
        <FormControl className={classes.healthRatingContainer}>
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
    </CSSTransition>
  );
};

export default NewEntry;
