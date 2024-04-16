import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ROLES_ENUM } from './enum/roles.enum';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'citas'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'citas',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('../app/components/appointments/appointments-routing.module').then(m => m.AppointmentsRoutingModule)
  },
  {
    path: 'configuracion',
    data: { role: ROLES_ENUM.ADMIN },
    canActivateChild: [AuthGuard],
    loadChildren: () => import('../app/components/configuration/configuration-routing.module').then(m => m.ConfigurationRoutingModule)
  },
  {
    path: '**',
    redirectTo: 'citas'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
