export interface Recource {
  id: string;
  type: string;
  meta: {
    preview: string,
    internalName: string,
  };
}

export interface Role {
  role: string;
  domain: string;
  resource: Recource;
}

export interface User {
  id: string;
  email: string;
  name: string;
  lastSeen: string;
  roles: Role[];
}

export interface Invite {
  email: string;
  created_at: string;
  roles: Role[];
}

export interface State {
  rowsLimit: number;
  users: User[];
  usersCount: number;
  showInvites: boolean;
  invites: Invite[];
}
