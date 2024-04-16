import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateProps } from '../store/app.state';
import { selectAccessToken } from '../store/app.selectors';
import { filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppStateProps>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.pipe(
            select(selectAccessToken),
            take(1),
            switchMap(token => {
                let authReq = req;
                if (token) {
                    authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
                }
                return next.handle(authReq);
            })
        );
    }
}