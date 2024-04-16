import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ApiResources } from "../helpers/api.resources";
import { ZoneProps } from "../models/zone";

@Injectable({
    providedIn: 'root'
})
export class ZoneService {

    constructor(private baseService: BaseService) {}

    public createZone(location: ZoneProps): Observable<ZoneProps> {
        return this.baseService.httpPost(ApiResources.location.base, location)
    }

    public getZones(): Observable<Array<ZoneProps>> {
        return this.baseService.httpGet(ApiResources.zone.base)
    }
}