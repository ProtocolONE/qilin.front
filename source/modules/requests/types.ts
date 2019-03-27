export interface Request {
  country: string;
  name: string;
  person: string;
  status: string;
  updatedAt: string;
  vendor_id: string;
}

export interface State {
  requests: Request[];
}