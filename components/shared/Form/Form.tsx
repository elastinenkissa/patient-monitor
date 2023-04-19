import { FC, FormEvent, ReactNode } from 'react';

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
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    props.onSubmit();
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
        <Button type="submit" className={classes.submitButton}>
          {props.buttonText}
        </Button>
      </form>
    </Card>
  );
};

export default Form;
