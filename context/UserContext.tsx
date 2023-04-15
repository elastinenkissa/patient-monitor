import { FC, ReactNode, createContext, useState } from 'react';

import { User } from '@/types/user';

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
  const [user, setUser] = useState<User | undefined>({
    id: 'u1',
    name: 'Max Mustermann',
    identificationNumber: '0506000954978',
    company: { id: 'c1', name: 'KYS' },
    imageUrl:
      'https://th.bing.com/th/id/R.2212e2e523684c91bb6ade690d9e3fc0?rik=jKD89fg3ekClvw&pid=ImgRaw&r=0',
    isAdministrator: true
  });

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
