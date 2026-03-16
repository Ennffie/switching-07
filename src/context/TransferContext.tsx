import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface PlanData {
  planName: string;
  trustee: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  employerName: string;
  icon: string;
}

interface FundAllocation {
  name: string;
  percentage: number;
}

interface TransferSection {
  title: string;
  funds: FundAllocation[];
}

interface TransferData {
  step1: PlanData | null;
  transferOut: TransferSection[];
  transferIn: TransferSection[];
}

interface TransferContextType {
  transferData: TransferData;
  setStep1Data: (data: PlanData) => void;
  setTransferOutData: (data: TransferSection[]) => void;
  setTransferInData: (data: TransferSection[]) => void;
  resetTransferData: () => void;
}

const defaultData: TransferData = {
  step1: null,
  transferOut: [],
  transferIn: [],
};

const STORAGE_KEY = 'switching-transfer-data';

const loadStoredTransferData = (): TransferData => {
  if (typeof window === 'undefined') return defaultData;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    return {
      step1: parsed?.step1 ?? null,
      transferOut: Array.isArray(parsed?.transferOut) ? parsed.transferOut : [],
      transferIn: Array.isArray(parsed?.transferIn) ? parsed.transferIn : [],
    };
  } catch {
    return defaultData;
  }
};

const TransferContext = createContext<TransferContextType | undefined>(undefined);

export function TransferProvider({ children }: { children: ReactNode }) {
  const [transferData, setTransferData] = useState<TransferData>(() => loadStoredTransferData());

  const setStep1Data = (data: PlanData) => {
    setTransferData(prev => ({ ...prev, step1: data }));
  };

  const setTransferOutData = (data: TransferSection[]) => {
    setTransferData(prev => ({ ...prev, transferOut: data }));
  };

  const setTransferInData = (data: TransferSection[]) => {
    setTransferData(prev => ({ ...prev, transferIn: data }));
  };

  const resetTransferData = () => {
    setTransferData(defaultData);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transferData));
  }, [transferData]);

  return (
    <TransferContext.Provider
      value={{
        transferData,
        setStep1Data,
        setTransferOutData,
        setTransferInData,
        resetTransferData,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
}

export function useTransfer() {
  const context = useContext(TransferContext);
  if (context === undefined) {
    throw new Error('useTransfer must be used within a TransferProvider');
  }
  return context;
}