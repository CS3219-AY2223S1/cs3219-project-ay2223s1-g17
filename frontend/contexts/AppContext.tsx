import { MatchingProvider } from 'contexts/MatchingContext';
import { AuthProvider } from 'contexts/AuthContext';
import { ReactNode } from 'react';
import { StopwatchProvider } from './CollabContext';

const AppContext = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <MatchingProvider>
        <StopwatchProvider>{children}</StopwatchProvider>
      </MatchingProvider>
    </AuthProvider>
  );
};

export default AppContext;
