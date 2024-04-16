import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { BaseService } from './base.service';
import * as AuthActions from '../store/app.actions';
import { AppStateProps } from '../store/app.state';
import { ApiResources } from '../helpers/api.resources';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private baseService: BaseService, private store: Store<AppStateProps>) {}

  public login(email: string, password: string): Observable<any> {
    return this.baseService.httpPost(ApiResources.account.login, { email, password }).pipe(
      tap(response => {
        this.store.dispatch(AuthActions.loginSuccess({ accountId: response.accountId, access_token: response.accessToken, role: response.role }));
      }),
      catchError(error => {
        this.store.dispatch(AuthActions.loginFailure({ error }));
        throw error;
      })
    );
  }
}