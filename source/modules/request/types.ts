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

export interface Contact {
  authorized: Authorized;
  technical: Technical;
}

export interface Request {
  banking: Banking;
  company: Company;
  contact: Contact;
  status: string;
}

export interface Country {
  name: string;
}

export interface Currency {
  name: string;
  value: string;
}

export interface State {
  countries: Country[];
  currencies: Currency[];
  request: Request;
  vendorId: string;
}
