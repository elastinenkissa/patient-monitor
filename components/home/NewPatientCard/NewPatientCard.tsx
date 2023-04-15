import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { Add } from '@mui/icons-material';
import { CSSTransition } from 'react-transition-group';

import Card from '@/components/shared/Card/Card';

import classes from './NewPatientCard.module.css';

const NewPatientCard: FC = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [content, setContent] = useState<string | ReactNode>(
    <Add fontSize={'large'} />
  );

  const hoverInHandler = () => {
    setHovered(true);
    setTimeout(() => {
      setContent('Add new patient');
    }, 300);
  };

  const hoverOutHandler = () => {
    setHovered(false);
    setTimeout(() => {
      setContent(<Add fontSize={'large'} />);
    }, 300);
  };

  return (
    <Link
      href="/patients/new"
      onMouseEnter={hoverInHandler}
      onMouseLeave={hoverOutHandler}
      className={classes.link}
    >
      <Card className={classes.newPatient}>
        <CSSTransition in={hovered} timeout={300} classNames="new-patient">
          <p className={classes.content}>{content}</p>
        </CSSTransition>
      </Card>
    </Link>
  );
};

export default NewPatientCard;
