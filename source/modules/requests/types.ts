export interface Request {
  country: string;
  name: string;
  person: string;
  status: string;
  updatedAt: string;
}

export interface State {
  requests: Request[];
}