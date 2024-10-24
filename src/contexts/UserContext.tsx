// src/contexts/UserContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface User {
  address: string;
  // 可以添加更多如token等字段
}

interface UserContextType {
  user: User | null;
  login: (address: string) => void; // 可以扩展方法以接受更多参数
  logout: () => void;
}

const defaultContext: UserContextType = {
  user: null,
  login: () => {}, // 默认无操作
  logout: () => {},
};

const UserContext = createContext<UserContextType>(defaultContext);

export type { User };

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedAddress = sessionStorage.getItem('accountAddress');
    if (storedAddress) {
      setUser({ address: storedAddress });
    }
  }, []);

  const login = (address: string) => {
    setUser({ address });
    sessionStorage.setItem('accountAddress', address);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('accountAddress');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
