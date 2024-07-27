import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface SiderContextProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  selectedKey: string;
  setSelectedKey: (key: string) => void;
  openKeys: string[];
  setOpenKeys: (keys: string[]) => void;
}

const SiderContext = createContext<SiderContextProps | undefined>(undefined);

export const useSider = () => {
  const context = useContext(SiderContext);
  if (!context) {
    throw new Error('useSider must be used within a SiderProvider');
  }
  return context;
};

export const SiderProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsedState] = useState<boolean>(() => {
    const savedState = sessionStorage.getItem('siderCollapsed');
    return savedState ? JSON.parse(savedState) : false;
  });

  const [selectedKey, setSelectedKeyState] = useState<string>(() => {
    return sessionStorage.getItem('selectedKey') || '';
  });

  const [openKeys, setOpenKeysState] = useState<string[]>(() => {
    const savedOpenKeys = sessionStorage.getItem('openKeys');
    return savedOpenKeys ? JSON.parse(savedOpenKeys) : [];
  });

  const setCollapsed = (collapsed: boolean) => {
    sessionStorage.setItem('siderCollapsed', JSON.stringify(collapsed));
    setCollapsedState(collapsed);
    if (!collapsed) {
      const savedOpenKeys = sessionStorage.getItem('openKeys');
      if (savedOpenKeys) {
        setOpenKeysState(JSON.parse(savedOpenKeys));
      }
    }
  };

  const setSelectedKey = (key: string) => {
    sessionStorage.setItem('selectedKey', key);
    setSelectedKeyState(key);
  };

  const setOpenKeys = (keys: string[]) => {
    sessionStorage.setItem('openKeys', JSON.stringify(keys));
    setOpenKeysState(keys);
  };

  useEffect(() => {
    const savedCollapsedState = sessionStorage.getItem('siderCollapsed');
    if (savedCollapsedState !== null) {
      const parsedCollapsedState = JSON.parse(savedCollapsedState);
      if (parsedCollapsedState !== collapsed) {
        setCollapsedState(parsedCollapsedState);
      }
    }

    const savedSelectedKey = sessionStorage.getItem('selectedKey');
    if (savedSelectedKey !== null) {
      if (savedSelectedKey !== selectedKey) {
        setSelectedKeyState(savedSelectedKey);
      }
    }

    const savedOpenKeys = sessionStorage.getItem('openKeys');
    if (savedOpenKeys !== null) {
      const parsedOpenKeys = JSON.parse(savedOpenKeys);
      if (JSON.stringify(parsedOpenKeys) !== JSON.stringify(openKeys)) {
        setOpenKeysState(parsedOpenKeys);
      }
    }
  }, []); // 仅在组件挂载时运行一次

  return (
    <SiderContext.Provider
      value={{
        collapsed,
        setCollapsed,
        selectedKey,
        setSelectedKey,
        openKeys,
        setOpenKeys,
      }}
    >
      {children}
    </SiderContext.Provider>
  );
};
