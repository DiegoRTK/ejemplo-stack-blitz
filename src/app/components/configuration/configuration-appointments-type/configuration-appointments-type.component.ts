import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BUTTON_ACTION_ENUM, BUTTON_CLASS_ENUM, BUTTON_ICON_ENUM } from 'src/app/enum/actions-type.enum';
import { AppointmentTypeProps } from 'src/app/models/appointment-type';
import { AlertService } from 'src/app/services/alert.service';
import { AppointmentTypeService } from 'src/app/services/appointment-type.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-configuration-appointments-type',
  templateUrl: './configuration-appointments-type.component.html',
  styleUrls: ['./configuration-appointments-type.component.scss']
})
export class ConfigurationAppointmentsTypeComponent implements OnInit {

  @ViewChild('modalComponent') modalComponent!: ModalComponent;

  public appointmentType: FormGroup = this.fb.group({
    typeName: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required)
  })

  public isLoading = false

  public message = 'Cargando...'

  public rows: Array<AppointmentTypeProps> = [];

  public columns = [
    { prop: 'typeName', name: 'Tipo de cita', width: 200 },
    { prop: 'duration', name: 'Duración (mins)', width: 150 }
  ];

  public durationsLst = [
    {
      label: '15 minutos',
      value: '15'
    }, {
      label: '30 minutos',
      value: '30'
    },
    {
      label: '45 minutos',
      value: '45'
    },
    {
      label: '60 minutos',
      value: '60'
    },
    {
      label: '90 minutos',
      value: '90'
    },
    {
      label: '120 minutos',
      value: '120'
    }
  ]


  public pagination = true;

  public pageSize = 0;

  public totalItems = 0;

  public tableButtons = [{
    label: 'Editar',
    action: BUTTON_ACTION_ENUM.EDIT,
    buttonClass: BUTTON_CLASS_ENUM.EDIT,
    icon: BUTTON_ICON_ENUM.EDIT
  },
  {
    label: 'Eliminar',
    action: BUTTON_ACTION_ENUM.DELETE,
    buttonClass: BUTTON_CLASS_ENUM.DELETE,
    icon: BUTTON_ICON_ENUM.DELETE
  }]

  public isEditing = false

  private appointmentTypeId: number | undefined

  constructor(
    private fb: FormBuilder,
    private appointmentTypeService: AppointmentTypeService,
    private toastr: ToastrService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getAppointmentTypes()
  }

  public openModal(): void {
    this.modalComponent.open({ size: 'xl' })
  }

  public async performAction(event: any): Promise<void> {
    const item: AppointmentTypeProps = { ...event.item };
    this.appointmentTypeId = item.appointmentTypeId as number
    switch (event.button) {
      case BUTTON_ACTION_ENUM.EDIT:
        this.openModal()
        this.isEditing = true
        delete item.appointmentTypeId
        delete item.appointmentTypeAgents
        delete item.createdAt
        this.appointmentType.setValue(item)
        break;
      case BUTTON_ACTION_ENUM.DELETE:
        const alertResult = await this.alertService.showConfirmation(`¿Desea eliminar el tipo de cita ${item.typeName}?`, 'Sí')
        if (alertResult.isConfirmed) {
          this.deleteAppointmentType()
        }
        break;
    }
  }

  public createAppointment(): void {
    if (!this.appointmentType.valid) {
      this.toastr.info('', 'Por favor, completa todos los campos obligatorios antes de continuar.')
      this.appointmentType.markAllAsTouched()
      this.appointmentType.markAsDirty()
      return
    }
    const appointmentType: AppointmentTypeProps = {
      duration: this.appointmentType.controls['duration'].value[0].value,
      typeName: this.appointmentType.controls['typeName'].value
    }
    this.isLoading = true
    if (this.isEditing) {
      this.message = 'Editando tipo de cita...'
      this.appointmentTypeService.updateAppointmentType(this.appointmentTypeId as number, appointmentType)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (value) => {
            this.toastr.success(`Se ha modificado el tipo de cita ${value.typeName} correctamente.`)
            this.rows.splice(this.rows.findIndex(app => app.appointmentTypeId === this.appointmentTypeId), 1, value)
            this.modalComponent.close()
          }
        })
    } else {
      this.message = 'Creando tipo de cita...'
      this.appointmentTypeService.createAppointment(appointmentType)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (value) => {
            this.toastr.success(`Se ha creado el tipo de cita ${value.typeName} correctamente.`)
            this.rows.push(value)
            this.modalComponent.close()
          },
          error: (error) => {
            this.toastr.error(error instanceof HttpErrorResponse ? error?.error.message : String(error))
          }
        })
    }
  }

  public getAppointmentTypes(): void {
    this.message = 'Cargando tipos de citas...'
    this.isLoading = true
    this.appointmentTypeService.getAppointmentTypes()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (types) => this.rows = types,
        error: (error) => {
          this.toastr.error(error instanceof HttpErrorResponse ? error?.error.message : String(error))
        }
      })
  }

  private deleteAppointmentType(): void {
    this.isLoading = true
    this.message = 'Eliminando tipo de cita...'
    this.appointmentTypeService.deleteAppointmentType(this.appointmentTypeId as number)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (value) => {
          this.toastr.success(`Se ha eliminado el tipo de cita ${value.typeName} correctamente.`)
          this.rows = this.rows.filter(app => app.appointmentTypeId != this.appointmentTypeId)
        },
        error: (error) => {
          this.toastr.error(error instanceof HttpErrorResponse ? error?.error.message : String(error))
        }
      })
  }
}
