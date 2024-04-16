export interface InitialState {
  isAuthenticated: boolean;
  accountId: string | null;
  access_token: string | null;
  error: any | null;
  currentRoute?: string;
  role: RoleProps
}

export interface AppStateProps {
  app: InitialState
}

export interface RoleProps {
  roleId:      number;
  roleName:    string;
  description: string;
  createdAt:   Date;
}
