import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MetaReducer, StoreModule, provideStore } from '@ngrx/store';
import { reducer } from './store/app.reducer';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { RequestInterceptor } from './helpers/http-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/app.effects';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { AppointmentsModule } from './components/appointments/appointments.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ConfigurationModule } from './components/configuration/configuration.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({ keys: ['app'], rehydrate: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({ app: reducer }, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      trace: false,
      traceLimit: 75
    }),
    EffectsModule.forRoot([AuthEffects]),
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    AppointmentsModule,
    NgxDatatableModule,
    ConfigurationModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
