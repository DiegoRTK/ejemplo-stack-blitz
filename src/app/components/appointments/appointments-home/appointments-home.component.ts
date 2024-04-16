// appointments-home.component.ts
import { HttpErrorResponse } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { filter, finalize } from 'rxjs';
import { ROLES_ENUM } from 'src/app/enum/roles.enum';
import { AppointmentProps } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-appointments-home',
  templateUrl: './appointments-home.component.html',
  styleUrls: ['./appointments-home.component.scss']
})
export class AppointmentsHomeComponent {
  public filters: FormGroup = this.fb.group({
    dates: new FormControl(),
    filterField: new FormControl(),
    value: new FormControl()
  });
  public fieldsLst = [
    { label: 'Tipo de cita', value: 'appointmentTypeAgent.appointmentType.typeName' },
    { label: 'Agente', value: 'appointmentTypeAgent.agent' },
    { label: 'Nombre', value: 'clientName' },
    { label: 'Código', value: 'code' }
  ];
  // public appointmentForm: FormGroup = this.fb.group({})

  public columns = [
    { name: 'Horario', prop: 'startingHour' },
    { name: 'Agente', prop: 'fullName' },
    { name: 'Tipo de cita', prop: 'appointmentTypeAgent.appointmentType.typeName' },
    { name: 'Nombre', prop: 'clientName' },
    { name: 'Código', prop: 'code' }
  ];

  public pagination = true;
  public isLoading = false;
  public message = 'Cargando...';
  public appointmentsLst: Array<AppointmentProps> = [];
  public appointmentsLstBU: Array<AppointmentProps> = [];
  public isPersonalData = true;
  public isLookingAppointments = false;
  public isConfirmScreen = false;
  public ROLES = ROLES_ENUM
  @ViewChild('modalComponent') modalComponent!: ModalComponent;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const { startOfWeek, endOfWeek } = this.getStartAndEndOfWeek();
    this.getAppointments(startOfWeek, endOfWeek);

    this.filters.get('filterField')?.valueChanges.subscribe(value => {
      this.onChangedField(value);
    });
    this.filters.get('dates')?.valueChanges.subscribe(value => {
      const dateArray = value.split('-')
      this.getAppointments(new Date(`${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`), new Date(`${dateArray[3]}-${dateArray[4]}-${dateArray[5]}`))
    })
  }

  public openModal(): void {
    this.isPersonalData = true
    this.modalComponent.open({ size: 'lg' })
  }

  public closeModal(): void {
    console.log('entra')
  }

  private onChangedField = (field: Array<Record<string,string>>): void => {
    this.filters.controls['value'].valueChanges.subscribe(filterSearch => {
      if (filterSearch && field.length > 0) {
        this.appointmentsLst = this.appointmentsLstBU.filter(row => console.log(row[field[0]['value']]))
      } else {
        this.appointmentsLst = this.appointmentsLstBU
      }
    })
  }

  private getAppointments = (startOfWeek: Date, endOfWeek: Date): void => {
    this.appointmentService
      .getAppointmentsWithinWeek(startOfWeek, endOfWeek)
      .subscribe({
        next: (appointments) => {
          this.appointmentsLst = appointments.map(row => ({ ...row, 'fullName': `${row.appointmentTypeAgent.agent.firstName} ${row.appointmentTypeAgent.agent.lastName}`}))
          this.appointmentsLstBU = [...this.appointmentsLst]
        },
        error: (error) => {
          this.toastr.error(
            error instanceof HttpErrorResponse
              ? error?.error.message
              : String(error) || 'Ha ocurrido un error cargando las citas.'
          );
        }
      });
  }

  private getStartAndEndOfWeek = (): { startOfWeek: Date; endOfWeek: Date } => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return { startOfWeek, endOfWeek };
  }
}
