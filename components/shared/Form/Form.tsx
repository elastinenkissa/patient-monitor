import { FC, FormEvent, ReactNode, useState } from 'react';
import { CircularProgress } from '@mui/material';

import Card from '../Card/Card';
import Button from '../Button/Button';

import classes from './Form.module.css';

interface FormProps {
  children: ReactNode;
  buttonText: string;
  onSubmit: () => void;
  inputsContainerHeight?: string;
}

const Form: FC<FormProps> = (props) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setDisabled(true);
    await props.onSubmit();
    setDisabled(false);
  };

  return (
    <Card className={classes.container}>
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
          disabled={disabled}
        >
          {disabled ? (
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
