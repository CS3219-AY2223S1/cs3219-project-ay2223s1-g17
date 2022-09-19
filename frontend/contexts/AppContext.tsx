import { MatchingProvider } from 'contexts/MatchingContext';
import { AuthProvider } from 'contexts/useAuth';
import { ReactNode } from 'react';

const AppContext = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <MatchingProvider>{children}</MatchingProvider>
    </AuthProvider>
  );
};

export default AppContext;
