import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { AppointmentTypeProps } from "../models/appointment-type";
import { ApiResources } from "../helpers/api.resources";

@Injectable({
    providedIn: 'root'
})
export class AppointmentTypeService {

    constructor(private baseService: BaseService) {}

    public createAppointment(appointmentType: AppointmentTypeProps): Observable<AppointmentTypeProps> {
        return this.baseService.httpPost(ApiResources.appointmentType.base, appointmentType)
    }

    public getAppointmentTypes(): Observable<Array<AppointmentTypeProps>> {
        return this.baseService.httpGet(ApiResources.appointmentType.base)
    }

    public updateAppointmentType(id: number, appointmentType: AppointmentTypeProps): Observable<AppointmentTypeProps> {
        return this.baseService.httpPut(ApiResources.appointmentType.byId(id), appointmentType)
    }

    public deleteAppointmentType(id: number): Observable<AppointmentTypeProps>{
        return this.baseService.httpDelete(ApiResources.appointmentType.byId(id))
    }
}