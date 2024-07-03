// src/contexts/UserContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

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

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (address: string) => {
    setUser({ address });
    // 这里可以扩展以保存更多登录信息
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
