import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { HTTP_METHOD, SERVICE } from 'util/enums';
import { apiCall } from 'util/helpers';

type User = {
  _id: string;
  username: string;
};

interface IAuthContext {
  user: User | undefined;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  user: undefined,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const refreshUserInfobyToken = async () => {
    setIsLoading(true);

    const res = await apiCall({
      path: '/refresh',
      service: SERVICE.USER,
      method: HTTP_METHOD.POST,
      requiresCredentials: true,
    });

    setUser(res as User);
  };

  useEffect(() => {
    if (!user) refreshUserInfobyToken();
  }, [user]);

  const login = async (username: string, password: string) => {
    await apiCall({
      path: '/login',
      service: SERVICE.USER,
      method: HTTP_METHOD.POST,
      requiresCredentials: true,
      body: { username, password },
    });

    refreshUserInfobyToken();
  };

  const logout = async () => {
    await apiCall({
      path: '/logout',
      service: SERVICE.USER,
      method: HTTP_METHOD.POST,
      requiresCredentials: true,
    });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
