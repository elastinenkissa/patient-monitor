import { FC, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';

import Card from '../../Card/Card';

import {
  NotificationContext,
  NotificationContextType
} from '@/context/NotificationContext';

const Notification: FC = () => {
  const { notification } =
    useContext<NotificationContextType>(NotificationContext);

  return (
    <CSSTransition
      in={notification.message !== ''}
      timeout={150}
      classNames="notification"
      mountOnEnter
      unmountOnExit
    >
      <Card
        style={{
          backgroundColor: notification.type === 'error' ? '#E47753' : '#6AB36A',
          position: 'absolute',
          bottom: 0,
          width: '80%',
          padding: '1rem',
          alignText: 'flex-start',
          maxHeight: 100,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {notification.message}
      </Card>
    </CSSTransition>
  );
};

export default Notification;
