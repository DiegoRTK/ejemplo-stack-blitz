import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ApiResources } from "../helpers/api.resources";
import { AppointmentProps } from "../models/appointment";

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    constructor(private baseService: BaseService) {}

    public getAppointmentsWithinWeek(startDate: Date, endDate: Date): Observable<Array<AppointmentProps>> {
        return this.baseService.httpGet(ApiResources.appointment.byDate(startDate, endDate))
    }
}