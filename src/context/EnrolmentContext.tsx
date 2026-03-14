import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type FundAllocation = { name: string; allocation: number };

interface EnrolmentContextType {
  mandatoryFunds: FundAllocation[];
  voluntaryFunds: FundAllocation[];
  setMandatoryFunds: React.Dispatch<React.SetStateAction<FundAllocation[]>>;
  setVoluntaryFunds: React.Dispatch<React.SetStateAction<FundAllocation[]>>;
}

const EnrolmentContext = createContext<EnrolmentContextType | undefined>(undefined);

export const EnrolmentProvider = ({ children }: { children: ReactNode }) => {
  const [mandatoryFunds, setMandatoryFunds] = useState<FundAllocation[]>([]);
  const [voluntaryFunds, setVoluntaryFunds] = useState<FundAllocation[]>([]);

  return (
    <EnrolmentContext.Provider value={{ mandatoryFunds, voluntaryFunds, setMandatoryFunds, setVoluntaryFunds }}>
      {children}
    </EnrolmentContext.Provider>
  );
};

export const useEnrolment = () => {
  const ctx = useContext(EnrolmentContext);
  if (!ctx) throw new Error('useEnrolment must be used within EnrolmentProvider');
  return ctx;
};
