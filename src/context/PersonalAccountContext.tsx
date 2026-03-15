import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface PersonalAccountData {
  email: string;
  mobileCountryCode: string;
  mobileNumber: string;
  secondPhoneCountryCode: string;
  secondPhoneNumber: string;
  residentialCountry: string;
  residentialCity: string;
  residentialUnit: string;
  residentialFloor: string;
  residentialBlock: string;
  residentialBuilding: string;
  residentialStreet: string;
  residentialDistrict: string;
  residentialPostalCode: string;
  correspondenceSameAsResidential: boolean;
  correspondenceCountry: string;
  correspondenceCity: string;
  correspondenceUnit: string;
  correspondenceFloor: string;
  correspondenceBlock: string;
  correspondenceBuilding: string;
  correspondenceStreet: string;
  correspondenceDistrict: string;
  correspondencePostalCode: string;
  directMarketingConsent: string;
  emailVerified: boolean;
  mobileVerified: boolean;
}


const defaultData: PersonalAccountData = {
  email: 'wong.kaming89@gmail.com',
  mobileCountryCode: '+852',
  mobileNumber: '96823451',
  secondPhoneCountryCode: '',
  secondPhoneNumber: '',
  residentialCountry: '香港',
  residentialCity: '',
  residentialUnit: 'Flat 8',
  residentialFloor: '12/F',
  residentialBlock: 'Block B',
  residentialBuilding: 'Mei Hong Court, South Horizons',
  residentialStreet: '8 South Horizons Drive',
  residentialDistrict: 'Ap Lei Chau',
  residentialPostalCode: '',
  correspondenceSameAsResidential: true,
  correspondenceCountry: '香港',
  correspondenceCity: '',
  correspondenceUnit: 'Flat 8',
  correspondenceFloor: '12/F',
  correspondenceBlock: 'Block B',
  correspondenceBuilding: 'Mei Hong Court, South Horizons',
  correspondenceStreet: '8 South Horizons Drive',
  correspondenceDistrict: 'Ap Lei Chau',
  correspondencePostalCode: '',
  directMarketingConsent: '是',
  emailVerified: false,
  mobileVerified: false,
};

interface PersonalAccountContextType {
  data: PersonalAccountData;
  setData: React.Dispatch<React.SetStateAction<PersonalAccountData>>;
}

const PersonalAccountContext = createContext<PersonalAccountContextType | undefined>(undefined);

export const PersonalAccountProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PersonalAccountData>(defaultData);
  return <PersonalAccountContext.Provider value={{ data, setData }}>{children}</PersonalAccountContext.Provider>;
};

export const usePersonalAccount = () => {
  const ctx = useContext(PersonalAccountContext);
  if (!ctx) throw new Error('usePersonalAccount must be used within PersonalAccountProvider');
  return ctx;
};
