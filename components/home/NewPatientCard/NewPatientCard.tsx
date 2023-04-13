import Card from '@/components/shared/Card/Card';
import Link from 'next/link';
import { FC, useState } from 'react';

import classes from './NewPatientCard.module.css';
import { Add } from '@mui/icons-material';

const NewPatientCard: FC = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <Link
      href="/patients/new"
      onMouseEnter={() =>
        setTimeout(() => {
          setHovered(true);
        }, 200)
      }
      onMouseLeave={() => setHovered(false)}
      className={classes.link}
    >
      <Card className={classes.newPatient}>
        {hovered ? <p>Add new patient</p> : <Add />}
      </Card>
    </Link>
  );
};

export default NewPatientCard;
