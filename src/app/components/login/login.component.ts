import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { login } from 'src/app/store/app.actions';
import { InitialState } from 'src/app/store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<InitialState>,
    private toastr: ToastrService,
  ) { }

  public submitForm(): void {
    if (!this.loginForm.valid) {
      this.toastr.info('', 'Por favor, completa todos los campos obligatorios antes de continuar.')
      this.loginForm.markAllAsTouched()
      this.loginForm.markAsDirty()
      return
    }
    this.store.dispatch(login({
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }));
  }
}
