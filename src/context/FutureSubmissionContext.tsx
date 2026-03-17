import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type SavedFundAllocation = { name: string; allocation: number };

interface FutureSubmissionContextType {
  referenceNumber: string;
  submittedAt: string;
  submittedEmployerMandatoryFunds: SavedFundAllocation[];
  submittedEmployeeMandatoryFunds: SavedFundAllocation[];
  setSubmittedEmployerMandatoryFunds: React.Dispatch<React.SetStateAction<SavedFundAllocation[]>>;
  setSubmittedEmployeeMandatoryFunds: React.Dispatch<React.SetStateAction<SavedFundAllocation[]>>;
  resetFutureSubmission: () => void;
}

const FUTURE_SUBMISSION_STORAGE_KEY = 'future-submission-data';

const loadFutureSubmissionData = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(FUTURE_SUBMISSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const FutureSubmissionContext = createContext<FutureSubmissionContextType | undefined>(undefined);

export const FutureSubmissionProvider = ({ children }: { children: ReactNode }) => {
  const makeReferenceNumber = () => 'IMD' + Date.now().toString().slice(-16);
  const makeSubmittedAt = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return `${dateStr}, ${timeStr}`;
  };

  const saved = loadFutureSubmissionData();
  const [referenceNumber, setReferenceNumber] = useState<string>(saved?.referenceNumber || makeReferenceNumber());
  const [submittedEmployerMandatoryFunds, setSubmittedEmployerMandatoryFunds] = useState<SavedFundAllocation[]>(saved?.submittedEmployerMandatoryFunds || []);
  const [submittedEmployeeMandatoryFunds, setSubmittedEmployeeMandatoryFunds] = useState<SavedFundAllocation[]>(saved?.submittedEmployeeMandatoryFunds || []);
  const [submittedAt, setSubmittedAt] = useState<string>(saved?.submittedAt || makeSubmittedAt());

  const resetFutureSubmission = () => {
    setReferenceNumber(makeReferenceNumber());
    setSubmittedAt(makeSubmittedAt());
    setSubmittedEmployerMandatoryFunds([]);
    setSubmittedEmployeeMandatoryFunds([]);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(FUTURE_SUBMISSION_STORAGE_KEY);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(FUTURE_SUBMISSION_STORAGE_KEY, JSON.stringify({
      referenceNumber,
      submittedAt,
      submittedEmployerMandatoryFunds,
      submittedEmployeeMandatoryFunds,
    }));
  }, [referenceNumber, submittedAt, submittedEmployerMandatoryFunds, submittedEmployeeMandatoryFunds]);

  return (
    <FutureSubmissionContext.Provider value={{ referenceNumber, submittedAt, submittedEmployerMandatoryFunds, submittedEmployeeMandatoryFunds, setSubmittedEmployerMandatoryFunds, setSubmittedEmployeeMandatoryFunds, resetFutureSubmission }}>
      {children}
    </FutureSubmissionContext.Provider>
  );
};

export const useFutureSubmission = () => {
  const ctx = useContext(FutureSubmissionContext);
  if (!ctx) throw new Error('useFutureSubmission must be used within FutureSubmissionProvider');
  return ctx;
};
