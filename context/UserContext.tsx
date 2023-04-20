import { FC, ReactNode, createContext, useState } from 'react';

import { UserType } from '@/models/user';

type User = UserType & { token: string };

export interface UserContextType {
  user: User | undefined;
  login: (user: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
  login: (_user: User) => {},
  logout: () => {}
});

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: FC<UserContextProviderProps> = (props) => {
  const [user, setUser] = useState<User | undefined>();

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
