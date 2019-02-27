export interface Role {
  id: number;
  title: any;
}

export interface Game {
  id: string;
  internalName: string;
  roles: number[];
}

export interface User {
  email: string;
  games: Game[];
  icon: string;
  id: number;
  lastSean: Date;
  name: string;
}

export interface State {
  users: User[];
  roles: Role[];
}