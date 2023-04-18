import { Favorite } from '@mui/icons-material';
import { FC, JSXElementConstructor, ReactElement, cloneElement } from 'react';

interface HealthRatingProps {
  healthRating: number;
}

const HealthRating: FC<HealthRatingProps> = (props) => {
  const heartsFragment = (
    <>
      <Favorite />
      <Favorite />
      <Favorite />
      <Favorite />
      <Favorite />
    </>
  );

  const heartsElements = heartsFragment.props.children;

  const hearts = heartsElements.map(
    (
      child: ReactElement<any, string | JSXElementConstructor<any>>,
      index: number
    ) =>
      cloneElement(child as ReactElement, {
        style: { color: props.healthRating >= index + 1 ? 'red' : 'gray' },
        key: index
      })
  );

  return <div>{hearts}</div>;
};

export default HealthRating;
