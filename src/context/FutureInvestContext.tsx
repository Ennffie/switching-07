import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type FundAllocation = { name: string; allocation: number };

interface FutureInvestContextType {
  employerMandatoryFunds: FundAllocation[];
  employeeMandatoryFunds: FundAllocation[];
  setEmployerMandatoryFunds: React.Dispatch<React.SetStateAction<FundAllocation[]>>;
  setEmployeeMandatoryFunds: React.Dispatch<React.SetStateAction<FundAllocation[]>>;
  resetFutureInvest: () => void;
}

const FutureInvestContext = createContext<FutureInvestContextType | undefined>(undefined);

export const FutureInvestProvider = ({ children }: { children: ReactNode }) => {
  const [employerMandatoryFunds, setEmployerMandatoryFunds] = useState<FundAllocation[]>([]);
  const [employeeMandatoryFunds, setEmployeeMandatoryFunds] = useState<FundAllocation[]>([]);

  const resetFutureInvest = () => {
    setEmployerMandatoryFunds([]);
    setEmployeeMandatoryFunds([]);
  };

  return (
    <FutureInvestContext.Provider value={{ employerMandatoryFunds, employeeMandatoryFunds, setEmployerMandatoryFunds, setEmployeeMandatoryFunds, resetFutureInvest }}>
      {children}
    </FutureInvestContext.Provider>
  );
};

export const useFutureInvest = () => {
  const ctx = useContext(FutureInvestContext);
  if (!ctx) throw new Error('useFutureInvest must be used within FutureInvestProvider');
  return ctx;
};
