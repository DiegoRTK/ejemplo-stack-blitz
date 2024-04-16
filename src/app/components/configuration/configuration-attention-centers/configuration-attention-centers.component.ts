import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { BUTTON_ACTION_ENUM, BUTTON_CLASS_ENUM, BUTTON_ICON_ENUM } from 'src/app/enum/actions-type.enum';
import { LocationProps, LocationPropsObj } from 'src/app/models/location';
import { AlertService } from 'src/app/services/alert.service';
import { LocationService } from 'src/app/services/location.service';
import { ZoneService } from 'src/app/services/zone.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-configuration-attention-centers',
  templateUrl: './configuration-attention-centers.component.html',
  styleUrls: ['./configuration-attention-centers.component.scss']
})
export class ConfigurationAttentionCentersComponent implements OnInit {
  @ViewChild('modalComponent') modalComponent!: ModalComponent;
  public attentionCenter: FormGroup = this.fb.group({
    locationName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    addressNro: new FormControl('', Validators.required),
    zoneId: new FormControl('', Validators.required),
  })
  public isLoading = false
  public message = 'Cargando...'
  public zonesLst: Array<Record<string | number, string | number>> = []
  public columns = [
    { prop: 'locationName', name: 'Nombre centro', width: 200 },
    { prop: 'zone.zoneName', name: 'Número de zona', width: 150 },
    { prop: 'fullAddress', name: 'Dirección', width: 150 },
  ];
  public rows: Array<LocationProps> = []
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
  public addresses: { label: string; value: string }[] = []
  public addressToLook = new FormControl('')
  private attentionCenterId: number | undefined


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private locationService: LocationService,
    private zoneService: ZoneService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getZones()
    this.getLocations()
    this.addressToLook.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged()).
      subscribe(value => {
        if (value) {
          this.getAddresses(value)
        }
      })
  }

  public openModal(): void {
    this.modalComponent.open({ size: 'xl' })
  }

  public createCenter(): void {
    if (!this.attentionCenter.valid) {
      this.toastr.info('', 'Por favor, completa todos los campos obligatorios antes de continuar.')
      this.attentionCenter.markAllAsTouched()
      this.attentionCenter.markAsDirty()
      return
    }
    const newCenter: LocationPropsObj = {
      locationName: this.attentionCenter.controls['locationName'].value,
      address: this.attentionCenter.controls['address'].value,
      addressNro: this.attentionCenter.controls['addressNro'].value,
      zoneId: this.attentionCenter.controls['zoneId'].value[0].value,
      fullAddress: `${this.attentionCenter.controls['address'].value} ${this.attentionCenter.controls['addressNro'].value}`
    }
    if (this.isEditing) {
      this.isLoading = true
      this.message = 'Editando centro de atención...'
      this.locationService.updateLocation(this.attentionCenterId as number, newCenter)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (value) => {
          this.toastr.success(`Se ha modificado el centro de atención ${value.locationName} correctamente.`)
          this.rows.splice(this.rows.findIndex(app => app.locationId === this.attentionCenterId), 1, value)
          this.modalComponent.close()
        }
      })
    } else {
      this.message = 'Creando centro de atención...'
      this.isLoading = true
      this.locationService.createLocation(newCenter)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (value) => {
            this.toastr.success(`Se ha creado el centro de atención ${value.locationName} correctamente`)
            this.rows.push(value)
            this.modalComponent.close()
          },
          error: (error) => {
            this.toastr.error(error instanceof HttpErrorResponse ? error?.error.message : String(error) || 'Ha ocurrido un error creando el centro de atención')
          }
        })
    }

  }

  public async performAction(event: any): Promise<void> {
    const item: LocationProps = { ...event.item }
    this.attentionCenterId = item.locationId
    switch (event.button) {
      case BUTTON_ACTION_ENUM.EDIT:
        delete item.locationId
        delete item.createdAt
        item.addressNro = '121'
        this.addressToLook.setValue(item.address)
        this.getAddresses(item.address)
        this.attentionCenter.patchValue(item)
        this.attentionCenter.controls['zoneId'].setValue(item.zone.zoneId)
        this.openModal()
        this.isEditing = true
        break;
      case BUTTON_ACTION_ENUM.DELETE:
        const alertResult = await this.alertService.showConfirmation(`¿Desea eliminar el centro ${item.locationName}?`, 'Sí')
        if (alertResult.isConfirmed) {
          this.deleteCenter()
        } break;
    }
  }

  public onAddressSelected(newAddress: { label: string, value: string }): void {
    this.attentionCenter.controls['address'].setValue(newAddress.value)
  }

  private deleteCenter(): void {
    this.isLoading = true
    this.message = 'Eliminando centro de atención...'
    this.locationService.deleteLocation(this.attentionCenterId as number)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (value) => {
          this.toastr.success(`Se ha eliminado el centro ${value.locationName} correctamente.`)
          this.rows = this.rows.filter(row => row.locationId !== this.attentionCenterId)
        }
      })
  }

  private getAddresses(query: string): void {
    this.locationService.getAddress(query)
      .subscribe({
        next: (addresses) => {
          if (this.addressToLook.value) {
            this.addresses = addresses.map(row => ({ value: row.address, label: row.address }))
          }
        }
      })
  }

  private getLocations(): void {
    this.isLoading = true
    this.message = 'Cargando ubicaciones...'
    this.locationService.getLocations()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (value) => this.rows = value
      })
  }

  private getZones(): void {
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
