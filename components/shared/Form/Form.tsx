import { FC, FormEvent, ReactNode, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import Card from '../Card/Card';
import Button from '../Button/Button';

import classes from './Form.module.css';

interface FormProps {
  children: ReactNode;
  buttonText: string;
  valid: boolean;
  onSubmit: () => void;
  inputsContainerHeight?: string;
  className?: string;
}

const Form: FC<FormProps> = (props) => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    await props.onSubmit();
    setSubmitted(false);
  };

  return (
    <Card className={classes.container + ' ' + props.className}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div
          className={classes.formInputs}
          style={{ height: props.inputsContainerHeight }}
        >
          {props.children}
        </div>
        <Button
          type="submit"
          className={classes.submitButton}
          disabled={!props.valid || submitted}
        >
          {submitted ? (
            <CircularProgress size={25} color="inherit" />
          ) : (
            props.buttonText
          )}
        </Button>
      </form>
    </Card>
  );
};

export default Form;
