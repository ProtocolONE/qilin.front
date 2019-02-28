export interface Authorized {
  email: string;
  fullName: string;
  phone: string
  position: string;
}

export interface Technical {
  email: string;
  fullName: string;
  phone: string
}

export interface Banking {
  accountNumber: string;
  address: string;
  currency: string;
  details: string
  name: string;
  swift: string;
}

export interface Company {
  additionalAddress: string;
  address: string;
  alternativeName: string;
  city: string;
  country: string;
  name: string;
  region: string;
  registrationNumber: string;
  taxId: string;
  zip: string;
}

export interface Contacts {
  authorized: Authorized;
  technical: Technical;
}

export interface Documents {
  banking: Banking;
  company: Company;
  contacts: Contacts;
  status: string;
}

export interface RequiredFields {
  banking: string[];
  company: string[];
  contacts: {
    authorized: string[],
    technical: string[],
  };
}

export interface State {
  documents: Documents;
  requiredFields: RequiredFields;
}
