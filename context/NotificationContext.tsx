import { FC, ReactNode, createContext, useEffect, useState } from 'react';

type NotificationType = 'error' | 'success' | '';

interface Notification {
  message: string;
  type: NotificationType;
}

export interface NotificationContextType {
  notification: Notification;
  setNotification: (message: string, type: NotificationType) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  notification: { message: '', type: '' },
  setNotification: (_message: string, _type: NotificationType) => {}
});

interface NotificationContextProviderProps {
  children: ReactNode;
}

const NotificationContextProvider: FC<NotificationContextProviderProps> = (
  props
) => {
  const [notificationState, setNotificationState] = useState<Notification>({
    message: '',
    type: ''
  });

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  const setNotification = (message: string, type: NotificationType) => {
    setNotificationState({ message, type });

    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(undefined);
    }

    const newTimeoutId = setTimeout(() => {
      setNotificationState((prevState) => {
        return { ...prevState, message: '' };
      });
    }, 5000);
    setTimeoutId(newTimeoutId);
  };

  return (
    <NotificationContext.Provider
      value={{ notification: notificationState, setNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
