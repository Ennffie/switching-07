import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

interface FutureSubmissionContextType {
  referenceNumber: string;
}

const FutureSubmissionContext = createContext<FutureSubmissionContextType | undefined>(undefined);

export const FutureSubmissionProvider = ({ children }: { children: ReactNode }) => {
  const referenceNumber = useMemo(() => 'IMD' + Date.now().toString().slice(-16), []);
  return (
    <FutureSubmissionContext.Provider value={{ referenceNumber }}>
      {children}
    </FutureSubmissionContext.Provider>
  );
};

export const useFutureSubmission = () => {
  const ctx = useContext(FutureSubmissionContext);
  if (!ctx) throw new Error('useFutureSubmission must be used within FutureSubmissionProvider');
  return ctx;
};
