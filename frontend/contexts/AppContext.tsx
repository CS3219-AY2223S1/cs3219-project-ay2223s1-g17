import { MatchingProvider } from 'contexts/MatchingContext';
import { AuthProvider } from 'contexts/AuthContext';
import { ReactNode } from 'react';
import { CollabProvider } from 'contexts/CollabContext';

const AppContext = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <MatchingProvider>
        <CollabProvider>{children}</CollabProvider>
      </MatchingProvider>
    </AuthProvider>
  );
};

export default AppContext;
