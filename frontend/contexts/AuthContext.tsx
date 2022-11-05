/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { HTTP_METHOD, LANGUAGE, SERVICE } from 'utils/enums';
import { apiCall } from 'utils/helpers';

type User = {
  _id: string;
  username: string;
  createdAt: string;
  preferredLanguage: LANGUAGE;
};

interface IAuthContext {
  user: User | undefined;
  isLoading: boolean;
  register: (
    username: string,
    password: string,
    preferredLanguage: LANGUAGE,
    onSuccess: () => void
  ) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
    onSuccess: () => void
  ) => Promise<void>;
  changePreferredLanguage: (
    preferredLanguage: LANGUAGE,
    onSuccess: () => void
  ) => Promise<void>;
  deleteAccount: (onSuccess: () => void) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  user: undefined,
  isLoading: true,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  changePassword: async () => {},
  changePreferredLanguage: async () => {},
  deleteAccount: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const refreshUserInfobyToken = async (token?: string) => {
    setIsLoading(true);

    if (token) {
      localStorage.setItem('jwt-token', token);
    } else {
      const jwtToken = localStorage.getItem('jwt-token');
      if (!jwtToken) return setIsLoading(false);
      token = jwtToken;
    }

    const res = await apiCall({
      path: '/refresh',
      service: SERVICE.USER,
      method: HTTP_METHOD.POST,
      allowError: true,
      token,
    });
    setUser(res as User);
    setIsLoading(false);
  };
  useEffect(() => {
    if (!user) refreshUserInfobyToken();
  }, [user]);

  const register = async (
    username: string,
    password: string,
    preferredLanguage: LANGUAGE,
    onSuccess: () => void
  ) => {
    await apiCall({
      path: '/register',
      service: SERVICE.USER,
      method: HTTP_METHOD.POST,
      body: { username, password, preferredLanguage },
      onSuccess,
    });
  };

  const login = async (username: string, password: string) => {
    const { token } = await apiCall({
      path: '/login',
      service: SERVICE.USER,
      method: HTTP_METHOD.POST,
      body: { username, password },
    });
    await refreshUserInfobyToken(token);
  };

  const logout = async () => {
    const onSuccess = () => {
      setUser(undefined);
      localStorage.removeItem('jwt-token');
    };

    await apiCall({
      path: '/logout',
      service: SERVICE.USER,
      method: HTTP_METHOD.POST,
      onSuccess,
    });
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    onSuccess: () => void
  ) => {
    const token = localStorage.getItem('jwt-token');
    if (!token) return;

    await apiCall({
      path: '/',
      service: SERVICE.USER,
      method: HTTP_METHOD.PUT,
      token,
      body: { currentPassword, newPassword },
      onSuccess,
    });
  };

  const changePreferredLanguage = async (
    preferredLanguage: LANGUAGE,
    onSuccess: () => void
  ) => {
    const token = localStorage.getItem('jwt-token');
    if (!token) return;

    await apiCall({
      path: '/language',
      service: SERVICE.USER,
      method: HTTP_METHOD.PUT,
      token,
      body: { preferredLanguage },
      onSuccess: () => {
        onSuccess();
        setUser({ ...(user as User), preferredLanguage });
      },
    });
  };

  const deleteAccount = async (onSuccess: () => void) => {
    const token = localStorage.getItem('jwt-token');
    if (!token) return;

    await apiCall({
      path: '/',
      service: SERVICE.USER,
      method: HTTP_METHOD.DELETE,
      token,
      onSuccess: () => {
        setUser(undefined);
        localStorage.removeItem('jwt-token');
        onSuccess();
      },
    });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      isLoading,
      register,
      login,
      logout,
      changePassword,
      changePreferredLanguage,
      deleteAccount,
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
