import { FC, ReactNode, createContext, useEffect, useState } from 'react';

interface Notification {
  message: string;
  type: string;
}

export interface NotificationContextType {
  notification: Notification;
  setNotification: (message: string, type: string) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  notification: { message: '', type: '' },
  setNotification: (_message: string, _type: string) => {}
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

  const setNotification = (message: string, type: string) => {
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
