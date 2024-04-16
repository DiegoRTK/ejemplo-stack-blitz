import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AccountProps } from 'src/app/models/account';
import { AdminsService } from 'src/app/services/admins.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-configuration-administrators',
  templateUrl: './configuration-administrators.component.html',
  styleUrls: ['./configuration-administrators.component.scss']
})
export class ConfigurationAdministratorsComponent implements OnInit {

  public adminForm: FormGroup = this.fb.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    isAdmin: new FormControl(false)
  })

  public rows: Array<AccountProps> = [
  ];

  public pagination = true;

  public columns = [
    { name: 'Email', prop: 'email' },
    { name: 'Rol', prop: 'role.roleName' },
  ];


  public isLoading = false
  public message = 'Cargando...'

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private adminService: AdminsService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  @ViewChild('modalComponent') modalComponent!: ModalComponent;

  public openModal(): void {
    this.modalComponent.open({ size: 'xl' })
  }

  public createCenter(): void {
    this.message = 'Creando administrador...'
    if (!this.adminForm.valid) {
      this.toastr.info('', 'Por favor, completa todos los campos obligatorios antes de continuar.')
      this.adminForm.markAllAsTouched()
      this.adminForm.markAsDirty()
      return
    }
    const newUser: AccountProps = {
      email: this.adminForm.controls['email'].value,
      password: this.adminForm.controls['password'].value
    }
    this.isLoading = true
    if (this.adminForm.controls['isAdmin'].value) {
      this.adminService.createAdministrador(newUser)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (value) => {
            this.rows.push(value)
            this.toastr.success('Se ha creado el administrador correctamente')
            this.modalComponent.close()
            console.log(value)
          }, error: (error) => {
            this.toastr.error(error instanceof HttpErrorResponse ? error?.error.message : String(error) || 'Ha ocurrido un error creando el usuario administrador')
          }
        })
    } else {
      this.adminService.createAgent(newUser)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (value) => {
            console.log(value)
          }, error: (error) => {
            this.toastr.error(error instanceof HttpErrorResponse ? error?.error.message : String(error) || 'Ha ocurrido un error creando el agente')
          }
        })
    }
    // this.isLoading = true
    // this.locationService.createLocation(this.attentionCenter.value)
    //   .pipe(finalize(() => this.isLoading = false))
    //   .subscribe({
    //     next: (value) => {
    //       this.toastr.success(`Se ha creado el centro de atención ${value.locationName} correctamente`)
    //     },
    //     error: (error) => {
    //       this.toastr.error(error instanceof HttpErrorResponse ? error?.error.message : String(error) || 'Ha ocurrido un error creando el centro de atención')
    //     }
    //   })
  }

  private getUsers(): void {
    this.isLoading = true
    this.message = 'Cargando usuarios...'
    this.adminService.getUsers()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (value) => this.rows = value,
        error: (error) => {
          this.toastr.error(error instanceof HttpErrorResponse ? error?.error.message : String(error) || 'Ha ocurrido un error cargando los usuarios')
        }
      })
  }
}
