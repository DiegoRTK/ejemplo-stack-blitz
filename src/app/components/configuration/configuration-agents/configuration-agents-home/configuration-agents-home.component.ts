import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { ZoneService } from 'src/app/services/zone.service';

@Component({
  selector: 'app-configuration-agents-home',
  templateUrl: './configuration-agents-home.component.html',
  styleUrls: ['./configuration-agents-home.component.scss']
})
export class ConfigurationAgentsHomeComponent implements OnInit {

  public agentForm: FormGroup = this.fb.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    addressNro: new FormControl('', Validators.required),
    vacationStart: new FormControl('', Validators.required),
    vacationEnd: new FormControl('', Validators.required),
    zoneId: new FormControl(null, Validators.required),
    appointmentTypeAgentId: new FormControl(null, Validators.required)
  })
  public isLoading = false
  public message = 'Cargando...'
  public zonesLst: Array<Record<string | number, string | number>> = []

  constructor(private fb: FormBuilder,
    private zoneService: ZoneService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.message = 'Cargando zonas...'
    this.zoneService.getZones().pipe(finalize(() => this.isLoading = false))
      .subscribe(
        {
          next: (value) => this.zonesLst = value.map(row => ({ value: row.zoneId as number, label: row.zoneName })),
          error: (error) => {
            this.toastr.error(error instanceof HttpErrorResponse ? error?.error.message : String(error) || 'Ha ocurrido un error cargando las zonas')
          }
        }
      )
  }
}
