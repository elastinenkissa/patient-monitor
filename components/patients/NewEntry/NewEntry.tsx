import { ChangeEvent, FC, ReactEventHandler, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  Badge,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import Card from '@/components/shared/Card/Card';
import MedicalRecord from '../MedicalRecord/MedicalRecord';

import classes from './NewEntry.module.css';
import NewRecord from './NewRecord/NewRecord';

interface NewEntryProps {
  visible: boolean;
}

const NewEntry: FC<NewEntryProps> = (props) => {
  const [show, setShow] = useState(false);

  const [diagnosis, setDiagnosis] = useState<Array<string>>([]);
  const [prescriptions, setPrescriptions] = useState<Array<string>>([]);

  const [contentValue, setContentValue] = useState<string>('');

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

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="modal-appear"
      mountOnEnter
      unmountOnExit
    >
      <Card className={classes.container}>
        <Box className={classes.form}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="content">Content</InputLabel>
            <OutlinedInput
              id="content"
              multiline
              className={classes.input}
              label="Content"
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
        </Box>
      </Card>
    </CSSTransition>
  );
};

export default NewEntry;
