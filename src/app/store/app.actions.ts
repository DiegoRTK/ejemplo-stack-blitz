import { createAction, props } from '@ngrx/store';
import { RoleProps } from './app.state';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string, password: string }>()
);


export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ accountId: string, access_token: string, role: RoleProps }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const setCurrentRoute = createAction('[Router] Set Current Route', props<{ route: string }>());

export const logout = createAction('[Auth] Logout');
